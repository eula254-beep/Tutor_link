// src/pages/TutorProfile.js
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import "./TutorProfile.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function TutorProfile() {
  const { tutorId } = useParams();
  const [tutor, setTutor] = useState(null);

  useEffect(() => {
    const fetchTutor = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/tutors/${tutorId}`);
        setTutor(data);
      } catch (err) {
        console.error("Error fetching tutor:", err);
      }
    };
    fetchTutor();
  }, [tutorId]);

  if (!tutor) return <p className="text-center mt-5">Loading tutor...</p>;

  return (
    <div className="profile-wrapper">
      {/* Centered card */}
      <div className="profile-card-wrapper text-center animate__animated animate__fadeInUp">
        <img
          src={tutor.img || "/images/default-avatar.jpg"}
          alt={tutor.name}
          className="profile-img mx-auto d-block mb-3"
        />

        <h3 className="fw-bold text-primary">{tutor.name}</h3>
        <h5 className="text-muted mb-3">{tutor.subject}</h5>

        <p className="text-secondary">{tutor.bio}</p>

        <div className="profile-meta justify-content-center">
          <p className="price">💰 Ksh {tutor.price}/hr</p>
          <p className="rating">⭐ {tutor.rating || 5.0}</p>
        </div>

        <div className="mt-4 d-flex justify-content-center gap-3 flex-wrap">
          <Link to="/tutors" className="btn btn-outline-primary px-4">
            ← Back to Tutors
          </Link>
          <Link
            to={`/book/${tutor._id}`}
            className="btn btn-primary px-4"
            onClick={(e) => {
              if (!localStorage.getItem("userToken")) {
                e.preventDefault();
                alert("Please log in before booking a session.");
              }
            }}
          >
            Book Session
          </Link>
        </div>
      </div>

      {/* Info cards */}
      <div className="container mt-5">
        <div className="row g-4">
          <div className="col-md-6">
            <div className="info-card">
              <h5>🎓 Qualifications</h5>
              <p>
                {tutor.qualifications ||
                  "Bachelor’s Degree in Education, specializing in their field of study."}
              </p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="info-card border-success">
              <h5>💡 Teaching Style</h5>
              <p>
                {tutor.teachingStyle ||
                  "Engaging, interactive, and tailored to each student’s needs."}
              </p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="info-card border-warning">
              <h5>📧 Contact Info</h5>
              <p>Email: <a href={`mailto:${tutor.email}`}>{tutor.email}</a></p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="info-card border-info">
              <h5>📅 Additional Info</h5>
              <p>
                {tutor.additionalInfo ||
                  "Offers both online and in-person sessions with flexible scheduling."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Page Footer */}
      <footer className="page-footer">
        <p>
          © 2025 TutorLink — Empowering learners to connect with great tutors.{" "}
          <a href="/about">Learn more</a>
        </p>
      </footer>
    </div>
  );
}
