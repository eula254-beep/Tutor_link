// src/pages/AddTutor.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddTutor() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    email: "",
    bio: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    // Basic validation
    if (!formData.name || !formData.subject || !formData.email) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/tutors", formData);
      setSuccessMessage("Tutor added successfully!");
      // Clear form
      setFormData({ name: "", subject: "", email: "", bio: "" });
      // Optionally redirect to tutors page
      navigate("/tutors");
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Failed to add tutor.");
    }
  };

  return (
    <div className="container mt-5 pt-5">
      <h2>Add New Tutor</h2>

      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-3">
          <label className="form-label">Name *</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Subject */}
        <div className="mb-3">
          <label className="form-label">Subject *</label>
          <input
            type="text"
            className="form-control"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email *</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Bio */}
        <div className="mb-3">
          <label className="form-label">Bio (Optional)</label>
          <textarea
            className="form-control"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add Tutor
        </button>
      </form>
    </div>
  );
}

export default AddTutor;
