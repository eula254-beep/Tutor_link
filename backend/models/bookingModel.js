import mongoose from "mongoose";

const bookingSchema = mongoose.Schema({
  tutorId: { type: mongoose.Schema.Types.ObjectId, ref: "Tutor", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  studentName: { type: String, required: true },
  studentEmail: { type: String, required: true },
  subject: { type: String },
  date: { type: Date, required: true },
  message: { type: String },
  paid: { type: Boolean, default: false }, // NEW FIELD
}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
