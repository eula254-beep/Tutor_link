// models/tutorModel.js
import mongoose from "mongoose";

const tutorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subject: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 }, // average rating
  reviewsCount: { type: Number, default: 0 },
  bio: { type: String, default: "" },
  email: { type: String, required: true, unique: true }
  }, { timestamps: true });

const Tutor = mongoose.model("Tutor", tutorSchema);
export default Tutor;
