// src/pages/Tutors.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Tutors.css";

export default function Tutors() {
  const [tutors, setTutors] = useState([]);
  const [filteredTutors, setFilteredTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("");
  const [priceRange, setPriceRange] = useState("");

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/tutors");
        setTutors(data);
        setFilteredTutors(data);
      } catch (err) {
        console.error(err);
        setError("Unable to fetch tutors 😕");
      } finally {
        setLoading(false);
      }
    };
    fetchTutors();
  }, []);

  useEffect(() => {
    let filtered = tutors;
    if (search)
      filtered = filtered.filter((t) =>
        t.name.toLowerCase().includes(search.toLowerCase())
      );
    if (subject)
      filtered = filtered.filter(
        (t) =>
          t.subject &&
          t.subject.toLowerCase().includes(subject.toLowerCase())
      );
    if (priceRange) {
      filtered = filtered.filter((t) => {
        if (priceRange === "low") return t.price < 1000;
        if (priceRange === "mid") return t.price >= 1000 && t.price < 2000;
        if (priceRange === "high") return t.price >= 2000;
        return true;
      });
    }
    setFilteredTutors(filtered);
  }, [search, subject, priceRange, tutors]);

  if (loading)
    return <p className="text-center py-5 text-secondary">Loading tutors...</p>;
  if (error)
    return <p className="text-center py-5 text-danger">{error}</p>;

  return (
    <div className="tutor-page">
      <div className="text-center mb-5" data-aos="fade-down">
        <h2 className="fw-bold text-gradient">Our Tutors</h2>
        <p className="text-muted lead">
          Learn from passionate, experienced educators who are ready to help you
          shine academically 
        </p>
      </div>

      {/* Filters */}
      <div
        className="filter-bar bg-white shadow-sm rounded-4 p-3 mb-5 d-flex flex-wrap justify-content-center"
        data-aos="fade-up"
      >
        <input
          type="text"
          placeholder="Search by name..."
          className="form-control m-2"
          style={{ maxWidth: "200px" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by subject..."
          className="form-control m-2"
          style={{ maxWidth: "200px" }}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <select
          className="form-select m-2"
          style={{ maxWidth: "180px" }}
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
        >
          <option value="">Price range</option>
          <option value="low">Below 1000</option>
          <option value="mid">1000 - 2000</option>
          <option value="high">Above 2000</option>
        </select>
      </div>

      {/* Tutor Cards */}
      <div className="container">
        <div className="row g-4">
          {filteredTutors.length > 0 ? (
            filteredTutors.map((tutor, index) => (
              <div
                key={tutor._id}
                className="col-sm-6 col-md-4"
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >
                <div className="card tutor-card border-0 shadow-lg h-100">
                  <div className="tutor-img-wrapper">
                    <img
                      src={tutor.img || "/images/placeholder.jpg"}
                      alt={tutor.name}
                      className="tutor-img"
                      loading="lazy"
                    />
                  </div>
                  <div className="card-body text-center">
                    <h5 className="fw-bold">{tutor.name}</h5>
                    <p className="text-secondary small mb-2">
                      {tutor.subject || "Subject not specified"}
                    </p>
                    <p className="text-success fw-semibold">
                      💰 Ksh. {tutor.price}/hr
                    </p>
                    <p className="rating mb-2">
                      {Array.from({ length: 5 }, (_, i) => (
                        <span key={i}>
                          {i < (tutor.rating || 0) ? "★" : "☆"}
                        </span>
                      ))}
                    </p>
                    <Link
                      to={`/tutor/${tutor._id}`}
                      className="btn btn-primary w-100 rounded-pill"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted">No tutors found 😞</p>
          )}
        </div>
      </div>

      {/* Motivation Footer */}
      <div className="tutor-footer text-center mt-5 py-4">
        <h5 className="text-white fw-bold">
          “Your learning journey starts with the right guide.”
        </h5>
        <p className="text-light mb-0">
          Choose your tutor and take the next step toward success 
        </p>
      </div>
    </div>
  );
}
