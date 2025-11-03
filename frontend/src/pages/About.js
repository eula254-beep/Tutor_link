// src/pages/About.js
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";

export default function About() {
  return (
    <div className="container mt-5">
{/* ================= HEADER ================= */}
<section
  className="text-center mb-5 py-5 rounded shadow-sm position-relative overflow-hidden"
  style={{
    backgroundImage: "url('/images/b1.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    color: "#fff",
  }}
>
  {/* Dark overlay for readability */}
  <div
    className="position-absolute top-0 start-0 w-100 h-100"
    style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1 }}
  ></div>

  <div className="position-relative" style={{ zIndex: 2 }}>
    <h2 className="display-5 fw-bold animate__animated animate__fadeInDown">
      Welcome to TutorLink
    </h2>
    <p className="lead animate__animated animate__fadeInUp">
      Your go-to platform for high school tutoring, online or in-person. Learn smarter, faster, and with confidence.
    </p>
    <a
      href="/tutors"
      className="btn btn-warning btn-lg fw-semibold mt-3 shadow animate__animated animate__fadeInUp animate__delay-1s"
    >
      Explore Tutors & Start Learning
    </a>
  </div>

  {/* Decorative shapes (optional) */}
  <div
    style={{
      position: "absolute",
      bottom: "-50px",
      right: "-50px",
      width: "150px",
      height: "150px",
      background: "rgba(255,255,255,0.2)",
      borderRadius: "50%",
      zIndex: 1,
    }}
  ></div>
  <div
    style={{
      position: "absolute",
      top: "-50px",
      left: "-50px",
      width: "200px",
      height: "200px",
      background: "rgba(255,255,255,0.15)",
      borderRadius: "50%",
      zIndex: 1,
    }}
  ></div>
</section>


      {/* ================= INTRODUCTION ================= */}
      <section className="mb-5 text-center animate__animated animate__fadeInUp">
        <p className="lead">
          At <strong>TutorLink</strong>, we connect high school students with friendly and experienced tutors. 
          Whether it's tricky math, exam prep, or extra practice, our tutors are here to guide you online or at home.
        </p>
      </section>

      {/* ================= FEATURES / SERVICES ================= */}
      <section className="mb-5">
        <h3 className="fw-bold text-center text-primary mb-4">Why Choose TutorLink?</h3>
        <div className="row g-4">
          <div className="col-md-6 col-lg-3">
            <div className="card h-100 shadow-sm border-0 hover-shadow p-3 text-center animate__animated animate__fadeIn">
              <div className="mb-3">
                <span className="fs-1 text-warning">📘</span>
              </div>
              <h5 className="fw-bold mb-2">Learn Any Subject</h5>
              <p className="text-muted small">
                Math, English, Science, and more. Get help with homework, tests, and exam prep.
              </p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="card h-100 shadow-sm border-0 hover-shadow p-3 text-center animate__animated animate__fadeIn">
              <div className="mb-3">
                <span className="fs-1 text-success">📅</span>
              </div>
              <h5 className="fw-bold mb-2">Flexible Learning</h5>
              <p className="text-muted small">
                Online or at home, scheduled at times that fit your school routine.
              </p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="card h-100 shadow-sm border-0 hover-shadow p-3 text-center animate__animated animate__fadeIn">
              <div className="mb-3">
                <span className="fs-1 text-info">🧑‍🏫</span>
              </div>
              <h5 className="fw-bold mb-2">Trusted Tutors</h5>
              <p className="text-muted small">
                Friendly, patient, and experienced. Focused on helping you succeed.
              </p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="card h-100 shadow-sm border-0 hover-shadow p-3 text-center animate__animated animate__fadeIn">
              <div className="mb-3">
                <span className="fs-1 text-danger">⚡</span>
              </div>
              <h5 className="fw-bold mb-2">Quick & Easy</h5>
              <p className="text-muted small">
                Simple process to find, book, and start learning. Safe and secure platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= GALLERY ================= */}
      <section className="py-5 bg-light text-center">
        <div className="container">
          <h2 className="fw-bold text-primary mb-4 animate__animated animate__fadeInDown">Our Gallery</h2>
          <p className="text-muted mb-5 animate__animated animate__fadeInUp">
            Take a peek into the TutorLink experience — our tutors, sessions, and happy students!
          </p>

          <div className="row g-3">
            {[
              "/images/project.jpg",
              "/images/b2.jpg",
              "/images/b3.jpg",
              "/images/online.jpg",
              "/images/alice.jpg",
              "/images/inperson.jpg",
            ].map((img, i) => (
              <div key={i} className="col-6 col-md-4 col-lg-3 animate__animated animate__zoomIn" style={{ animationDelay: `${i * 0.1}s` }}>
                <img
                  src={img}
                  alt={`Gallery ${i + 1}`}
                  className="img-fluid rounded shadow-sm"
                  style={{ cursor: "pointer", transition: "transform 0.3s" }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CALL TO ACTION ================= */}
      <section className="text-center mb-5">
        <a href="/tutors" className="btn btn-primary btn-lg fw-semibold shadow-lg animate__animated animate__pulse animate__infinite">
          Browse Tutors & Start Learning
        </a>
      </section>

      {/* ================= FOOTER ================= */}
      <section className="text-center mt-5 mb-5 text-muted small">
        <p className="mb-1">👩‍💻 Developed by: <strong>Eula Shalet</strong></p>
        <p>TutorLink | High School Focus | Personalized Learning</p>
      </section>
    </div>
  );
}
