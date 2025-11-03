import express from "express";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    console.log("📩 New message:", { name, email, message });

    // Optional: send email with nodemailer or save to MongoDB
    res.status(200).json({ message: "Message received successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
