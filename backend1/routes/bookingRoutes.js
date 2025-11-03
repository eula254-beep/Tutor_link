import express from "express";
import Booking from "../models/bookingModel.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all bookings for logged-in user
router.get("/my", protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate("tutorId", "name subject");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get single booking by ID
router.get("/:id", protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("tutorId", "name subject");
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    if (booking.user.toString() !== req.user._id.toString())
      return res.status(401).json({ message: "Not authorized" });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: "Error fetching booking" });
  }
});

// Create booking
router.post("/", protect, async (req, res) => {
  try {
    const { tutorId, studentName, studentEmail, subject, date, message } = req.body;
    const booking = await Booking.create({
      tutorId,
      user: req.user._id,
      studentName,
      studentEmail,
      subject,
      date,
      message,
    });
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: "Error creating booking" });
  }
});

// Update booking by ID
router.put("/:id", protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    if (booking.user.toString() !== req.user._id.toString())
      return res.status(401).json({ message: "Not authorized" });

    booking.studentName = req.body.studentName || booking.studentName;
    booking.studentEmail = req.body.studentEmail || booking.studentEmail;
    booking.subject = req.body.subject || booking.subject;
    booking.date = req.body.date || booking.date;
    booking.message = req.body.message || booking.message;

    const updated = await booking.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating booking" });
  }
});

// Delete booking
router.delete("/:id", protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    if (booking.user.toString() !== req.user._id.toString())
      return res.status(401).json({ message: "Not authorized" });

    await booking.deleteOne();
    res.json({ message: "Booking deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting booking" });
  }
});

export default router;
