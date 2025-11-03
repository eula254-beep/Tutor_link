// routes/paymentRoutes.js
import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import Booking from "../models/bookingModel.js";
import { protect } from "../middleware/authMiddleware.js";

dotenv.config();
const router = express.Router();

// Get access token from Daraja (sandbox)
const getAccessToken = async () => {
  try {
    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");

    const { data } = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      { headers: { Authorization: `Basic ${auth}` } }
    );

    return data.access_token;
  } catch (err) {
    console.error("Error generating access token:", err.response?.data || err.message);
    throw new Error("Failed to generate M-Pesa access token");
  }
};

// Helper: normalize phone to 2547XXXXXXXX
const normalizePhone = (raw) => {
  if (!raw) return null;
  let p = raw.toString().trim();
  if (p.startsWith("+")) p = p.slice(1);
  if (p.startsWith("0") && p.length === 10) p = "254" + p.slice(1);
  // if user already supplied 07... or 2547...
  if (/^7\d{8}$/.test(p)) p = "254" + p; // maybe they typed 7XXXXXXXX
  return p;
};

// STK Push: initiate payment
router.post("/stkpush", protect, async (req, res) => {
  try {
    const { phoneNumber: rawPhone, amount, bookingId } = req.body;

    // Validate input
    if (!bookingId) return res.status(400).json({ message: "Missing bookingId" });
    if (!rawPhone) return res.status(400).json({ message: "Missing phoneNumber" });
    if (!amount || Number(amount) <= 0) return res.status(400).json({ message: "Invalid amount" });

    // Check booking exists
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // Normalize phone
    const phoneNumber = normalizePhone(rawPhone);
    if (!/^254\d{9}$/.test(phoneNumber)) {
      return res.status(400).json({ message: "Phone number must be in format 2547XXXXXXXX" });
    }

    // Callback URL (must be HTTPS and reachable by Safaricom)
    const ngrokUrl = process.env.NGROK_URL || process.env.MPESA_CALLBACK_URL || "";
    if (!ngrokUrl || !ngrokUrl.startsWith("https://")) {
      console.warn("NGROK_URL / MPESA_CALLBACK_URL missing or not HTTPS:", ngrokUrl);
      return res.status(400).json({
        message:
          "Callback URL not configured or not HTTPS. Start ngrok and set NGROK_URL in .env (https://xxxxx.ngrok.io).",
      });
    }
    const callbackUrl = `${ngrokUrl.replace(/\/$/, "")}/api/payments/callback`;

    // Get access token
    const token = await getAccessToken();

    // Build timestamp and password
    const shortcode = process.env.MPESA_SHORTCODE;
    const passkey = process.env.MPESA_PASSKEY;
    const timestamp = new Date().toISOString().replace(/[-:TZ.]/g, "").slice(0, 14);
    const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString("base64");

    // Prepare payload
    const stkPayload = {
      BusinessShortCode: shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: Number(amount),
      PartyA: phoneNumber, // payer
      PartyB: shortcode,
      PhoneNumber: phoneNumber,
      CallBackURL: callbackUrl,
      AccountReference: `Booking${bookingId}`,
      TransactionDesc: `Payment for booking ${bookingId}`,
    };

    console.log("🔔 STK Payload:", JSON.stringify(stkPayload, null, 2));

    // Call Daraja STK push endpoint
    const { data } = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      stkPayload,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // Return Daraja's response to frontend
    return res.json(data);
  } catch (err) {
    console.error("Payment Error Details:", err.response?.data || err.message);
    // If Daraja returned structured error details, forward them
    const darajaError = err.response?.data || err.message;
    return res.status(500).json({
      message: "Failed to initiate payment",
      error: darajaError,
    });
  }
});

// Callback endpoint to receive STK result from Daraja
router.post("/callback", async (req, res) => {
  try {
    console.log("✅ M-Pesa Callback received:", JSON.stringify(req.body, null, 2));

    const stkCallback = req.body?.Body?.stkCallback;
    if (!stkCallback) {
      return res.status(400).send("No stkCallback in body");
    }

    const resultCode = stkCallback.ResultCode;
    const merchantRequestId = stkCallback.MerchantRequestID;
    const checkoutRequestId = stkCallback.CheckoutRequestID;

    // AccountReference is typically inside CallbackMetadata items (if success)
    const metadataItems = stkCallback.CallbackMetadata?.Item || [];

    const accountRefItem = metadataItems.find((i) => i.Name === "AccountReference");
    const accountRef = accountRefItem?.Value || null;

    // If success, mark booking paid (accountRef is Booking{bookingId})
    if (resultCode === 0 && accountRef) {
      const bookingId = accountRef.replace("Booking", "");
      try {
        await Booking.findByIdAndUpdate(bookingId, { paid: true });
        console.log("💰 Booking marked paid:", bookingId);
      } catch (err) {
        console.error("Error updating booking paid status:", err.message);
      }
    } else {
      console.log("Payment not successful. ResultCode:", resultCode);
    }

    // respond 200 quickly
    res.status(200).send("Callback received");
  } catch (err) {
    console.error("Callback processing error:", err.message);
    res.status(500).send("Error processing callback");
  }
});

export default router;
