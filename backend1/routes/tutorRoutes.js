import express from "express";
import Tutor from "../models/tutorModel.js";

const router = express.Router();

// =================== CREATE TUTOR ===================
router.post("/", async (req, res) => {
  try {
    const tutor = await Tutor.create(req.body);
    res.status(201).json(tutor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// =================== READ ALL TUTORS ===================
router.get("/", async (req, res) => {
  try {
    const tutors = await Tutor.find();
    res.status(200).json(tutors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// =================== READ ONE TUTOR ===================
router.get("/:id", async (req, res) => {
  try {
    const tutor = await Tutor.findById(req.params.id);
    if (!tutor) return res.status(404).json({ message: "Tutor not found" });
    res.status(200).json(tutor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// =================== UPDATE TUTOR ===================
router.put("/:id", async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "No data provided to update" });
    }

    const tutor = await Tutor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // ensures schema validation
    );

    if (!tutor) return res.status(404).json({ message: "Tutor not found" });

    res.status(200).json(tutor);
  } catch (err) {
    console.error("Update Tutor Error:", err);
    res.status(500).json({ message: err.message });
  }
});

// =================== DELETE TUTOR ===================
router.delete("/:id", async (req, res) => {
  try {
    const tutor = await Tutor.findByIdAndDelete(req.params.id);
    if (!tutor) return res.status(404).json({ message: "Tutor not found" });
    res.status(200).json({ message: "Tutor deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ DEFAULT EXPORT
export default router;
