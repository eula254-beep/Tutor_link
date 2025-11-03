import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";

function BookSessionF() {
  const { tutorId: urlTutorId } = useParams();
  const navigate = useNavigate();
  const location = useLocation(); // capture current location
  const [tutors, setTutors] = useState([]);
  const [formData, setFormData] = useState({
    tutorId: urlTutorId || "",
    studentName: "",
    studentEmail: "",
    subject: "",
    date: "",
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Redirect to login/register if not logged in
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      navigate("/login", { state: { from: location } });
    }
  }, [navigate, location]);

  // Load tutors
  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/tutors");
        setTutors(data);
      } catch (err) {
        console.error("Error fetching tutors:", err);
      }
    };
    fetchTutors();
  }, []);

  useEffect(() => {
    if (urlTutorId) setFormData((prev) => ({ ...prev, tutorId: urlTutorId }));
  }, [urlTutorId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    if (!formData.tutorId || !formData.studentName || !formData.studentEmail || !formData.subject || !formData.date) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    try {
      const token = localStorage.getItem("userToken");
      if (!token) throw new Error("Not authorized");

      await axios.post(
        "http://localhost:5000/api/bookings",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccessMessage("Booking saved successfully!");
      setFormData({
        tutorId: urlTutorId || "",
        studentName: "",
        studentEmail: "",
        subject: "",
        date: "",
        message: "",
      });

      setTimeout(() => navigate("/my-bookings"), 1500);
    } catch (err) {
      console.error(err);
      setErrorMessage(err.response?.data?.message || err.message || "Booking failed");
    }
  };

  return (
    <div className="container mt-5 pt-5">
      <h2>Book a Session</h2>
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Select Tutor</label>
          <select
            className="form-select"
            name="tutorId"
            value={formData.tutorId}
            onChange={handleChange}
            required
          >
            <option value="">-- Select a Tutor --</option>
            {tutors.map((tutor) => (
              <option key={tutor._id} value={tutor._id}>
                {tutor.name} ({tutor.subject})
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>Your Name</label>
          <input
            type="text"
            className="form-control"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Your Email</label>
          <input
            type="email"
            className="form-control"
            name="studentEmail"
            value={formData.studentEmail}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Subject</label>
          <input
            type="text"
            className="form-control"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Date & Time</label>
          <input
            type="datetime-local"
            className="form-control"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Message (Optional)</label>
          <textarea
            className="form-control"
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">Book Session</button>
      </form>
    </div>
  );
}

export default BookSessionF;
