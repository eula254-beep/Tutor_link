import React, { useState } from "react";
import { FaUser, FaEnvelope, FaCommentDots, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";


export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/contact`, formData);
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to send message.");
    }
  };

  return (
    <section
      className="d-flex align-items-center justify-content-center position-relative"
      style={{ minHeight: "90vh", background: `url('/images/b1.jpg') center/cover no-repeat` }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.6)", zIndex: 1 }}></div>

      <div className="container position-relative" style={{ zIndex: 2 }}>
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card glass-card p-5 animate__animated animate__fadeInUp">
              <div className="text-center mb-4">
                <h2 className="fw-bold text-warning">Get in Touch</h2>
                <p className="text">
                  Questions, suggestions, or inquiries? Our team is ready to assist you!
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-3 position-relative">
                  <FaUser className="position-absolute top-50 translate-middle-y ms-3 text-warning" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control ps-5 rounded-pill glass-input"
                    placeholder="Your Name"
                    required
                  />
                </div>

                <div className="mb-3 position-relative">
                  <FaEnvelope className="position-absolute top-50 translate-middle-y ms-3 text-warning" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control ps-5 rounded-pill glass-input"
                    placeholder="Your Email"
                    required
                  />
                </div>

                <div className="mb-3 position-relative">
                  <FaCommentDots className="position-absolute top-0 start-0 mt-3 ms-3 text-warning" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-control ps-5 pt-3 rounded-3 glass-input"
                    rows="5"
                    placeholder="Your Message"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-gradient w-100 fw-bold shadow-sm rounded-pill">
                  Send Message
                </button>
              </form>

              <div className="text-center mt-4 text small d-flex flex-column gap-2">
                <span><FaPhone /> +254 746 797 340</span>
                <span><FaEnvelope /> support@tutorlink.com</span>
                <span><FaMapMarkerAlt /> Nairobi, Kenya</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
