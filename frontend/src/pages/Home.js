// src/pages/Home.js
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// Hero images array moved outside component (stable reference)
const images = ["/images/b1.jpg", "/images/b2.jpg", "/images/b3.jpg"];

export default function Home() {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [currentBg, setCurrentBg] = useState(0);

  const sendMessage = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { text: input, fromUser: true }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: "Hi! Thanks for reaching out — a TutorLink representative will reply soon. 😊",
          fromUser: false,
        },
      ]);
    }, 1000);
  };

  // Hero background rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []); // no dependencies needed now

  return (
    <div className="home-page">
      {/* ================= HERO SECTION ================= */}
      <section
        className="hero-section d-flex align-items-center justify-content-center text-center text-white"
        style={{ height: "90vh", overflow: "hidden", position: "relative" }}
      >
        {/* Rotating Background */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url("${images[currentBg]}") center/cover no-repeat`,
            transition: "background 1s ease-in-out",
            zIndex: 1,
          }}
        ></div>

        <div className="container animate__animated animate__fadeInUp position-relative" style={{ zIndex: 2 }}>
          <h1 className="fw-bold display-3 mb-3">
            Unlock Your Potential with <span className="highlight-text">TutorLink</span>
          </h1>
          <p className="lead mb-4">
            Personalized learning designed to fit your goals — online or in person.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <a href="#methods" className="btn btn-warning btn-lg fw-semibold px-4 shadow-sm">
              Explore Our Methods
            </a>
            <a href="/tutors" className="btn btn-outline-light btn-lg fw-semibold px-4">
              Meet Our Tutors
            </a>
          </div>
        </div>

        {/* Floating decorative elements */}
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
      </section>

    {/* ================= WHY CHOOSE US ================= */}
<section
  className="py-5 text-center position-relative"
  style={{ background: "linear-gradient(135deg, #e0f0ff, #c0e0ff)" }}
>
  {/* Decorative shapes */}
  <div
    style={{
      position: "absolute",
      top: "-40px",
      left: "-40px",
      width: "100px",
      height: "100px",
      background: "rgba(13,110,253,0.1)",
      borderRadius: "50%",
      zIndex: 1,
    }}
  ></div>
  <div
    style={{
      position: "absolute",
      bottom: "-50px",
      right: "-50px",
      width: "150px",
      height: "150px",
      background: "rgba(102,16,242,0.1)",
      borderRadius: "50%",
      zIndex: 1,
    }}
  ></div>

  <div className="container position-relative" style={{ zIndex: 2 }}>
    <h2 className="fw-bold text-primary mb-5 animate__animated animate__fadeInDown">
      Why Choose TutorLink?
    </h2>
    <div className="row justify-content-center">
      {[
        {
          icon: "bi bi-stars",
          title: "Expert Tutors",
          desc: "All our tutors are vetted professionals with proven teaching experience.",
        },
        {
          icon: "bi bi-clock-history",
          title: "Flexible Scheduling",
          desc: "We adapt to your timetable  learn when it works best for you.",
        },
        {
          icon: "bi bi-laptop",
          title: "Modern Learning Tools",
          desc: "Interactive resources, quizzes, and feedback at your fingertips.",
        },
        {
          icon: "bi bi-heart-fill",
          title: "Personalized Care",
          desc: "We treat every learner as unique, tailoring lessons to individual needs.",
        },
      ].map((item, i) => (
        <div
          key={i}
          className="col-12 col-md-3 mb-4 animate__animated animate__zoomIn"
          style={{ animationDelay: `${i * 0.2}s` }}
        >
          <div className="card border-0 shadow-sm p-4 rounded-4 h-100 reason-card text-center">
            <i className={`${item.icon} fs-1 mb-3 reason-icon`}></i>
            <h5 className="fw-bold">{item.title}</h5>
            <p className="text-muted">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>

  <style jsx>{`
    .reason-card {
      transition: all 0.3s ease;
      background: white;
    }
    .reason-card:hover {
      transform: translateY(-8px) scale(1.03);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
    }
    .reason-icon {
      background: linear-gradient(135deg, #ffb300, #ff6f00);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    @media (max-width: 768px) {
      h2 {
        font-size: 2rem;
      }
    }
  `}</style>
</section>
{/* ================= DIRECTOR / FOUNDER SPOTLIGHT ================= */}
<section
  className="py-5 position-relative text-center text-light"
  style={{
    background: "linear-gradient(135deg, #0d6efd, #3f8efc)",
    overflow: "hidden",
  }}
>
  {/* Decorative floating shapes */}
  <div className="floating-circle bg-white opacity-25" style={{ top: "10%", left: "15%" }}></div>
  <div className="floating-circle bg-warning opacity-25" style={{ top: "50%", right: "10%" }}></div>
  <div className="floating-circle bg-light opacity-25" style={{ bottom: "10%", left: "30%" }}></div>

  <div className="container position-relative" style={{ zIndex: 2, maxWidth: "900px" }}>
    <h2 className="fw-bold mb-4 animate__animated animate__fadeInDown">
      Meet Our Director
    </h2>

    <div className="card border-0 rounded-4 shadow-lg bg-white text-dark mx-auto p-4 director-spotlight animate__animated animate__zoomIn">
      <div className="row align-items-center g-4">
        {/* Left: Image */}
        <div className="col-12 col-md-5 text-center">
          <img
            src="/images/b4.jpeg"
            alt="Eula Shalet"
            className="rounded-circle director-img mb-3"
          />
          <h5 className="fw-bold mb-0">Eula Shalet</h5>
          <p className="text-primary fst-italic mb-1">Founder & Director, <strong>TutorLink</strong></p>
          <p className="text-muted small">
            Driven by passion, purpose, and the belief that every student can thrive.
          </p>
        </div>

        {/* Right: Message + Achievements */}
        <div className="col-12 col-md-7 text-start">
          <blockquote className="fst-italic text-secondary mb-4">
            “Education should not just inform , it should inspire. At TutorLink, we build confidence, not just grades.”
          </blockquote>

          <div className="row g-3">
            {[
              { icon: "🎓", title: "30+ Students Mentored" },
              { icon: "🌍", title: "5+ Partner Schools" },
              { icon: "🏆", title: "Award for Community Service Learning Innovation (2025)" },
            ].map((item, i) => (
              <div key={i} className="col-12 col-sm-6 animate__animated animate__fadeInUp" style={{ animationDelay: `${i * 0.3}s` }}>
                <div className="achievement-card d-flex align-items-center shadow-sm p-3 rounded-4 bg-light">
                  <div className="fs-3 me-3">{item.icon}</div>
                  <p className="mb-0 fw-semibold text-secondary small">{item.title}</p>
                </div>
              </div>
            ))}
          </div>

          
        </div>
      </div>
    </div>
  </div>

  <style jsx>{`
    .floating-circle {
      position: absolute;
      width: 120px;
      height: 120px;
      border-radius: 50%;
      animation: float 8s ease-in-out infinite;
    }
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
      100% { transform: translateY(0px); }
    }
    .director-img {
      width: 150px;
      height: 150px;
      object-fit: cover;
      border: 4px solid #0d6efd;
      box-shadow: 0 8px 25px rgba(13,110,253,0.3);
      transition: transform 0.4s ease;
    }
    .director-img:hover {
      transform: scale(1.05);
    }
    .achievement-card {
      transition: all 0.3s ease;
    }
    .achievement-card:hover {
      background: #ffffff;
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    }
    @media (max-width: 768px) {
      .director-img {
        width: 120px;
        height: 120px;
      }
    }
  `}</style>
</section>

{/* ================= TEACHING METHODS ================= */}
<section
  id="methods"
  className="py-5 text-center position-relative"
  style={{
    background: "linear-gradient(135deg, #0d6efd 0%, #6610f2 100%)",
    color: "white",
    overflow: "hidden",
  }}
>
  {/* Decorative wave separator at the top */}
  <div
    style={{
      position: "absolute",
      top: "-1px",
      left: 0,
      width: "100%",
      height: "80px",
      background: "url('https://www.svgrepo.com/show/347296/wave-top.svg') no-repeat center/cover",
      transform: "rotate(180deg)",
      opacity: 0.2,
    }}
  ></div>

  <div className="container position-relative" style={{ zIndex: 2 }}>
    <h2 className="fw-bold mb-4 animate__animated animate__fadeInDown">
      Our Teaching Methods
    </h2>
    <p className="lead mb-5 text-light opacity-75 animate__animated animate__fadeInUp">
      We believe every student learns differently  so we make learning personal, interactive, and inspiring.
    </p>

    <div className="row justify-content-center">
      {[
        {
          img: "/images/online.jpg",
          title: "Online Lessons",
          desc: "Flexible, live video sessions that bring expert tutors right to your home.",
        },
        {
          img: "/images/inperson.jpg",
          title: "In-Person Lessons",
          desc: "Hands-on, focused, and practical learning guided by certified tutors.",
        },
        {
          img: "/images/group.jpg",
          title: "Group Sessions",
          desc: "Collaborative sessions where students learn together and grow faster.",
        },
        {
          img: "/images/b2.jpg",
          title: "Project-Based Learning",
          desc: "Engage with real-world projects to deepen understanding and creativity.",
        },
      ].map((method, i) => (
        <div
          key={i}
          className="col-12 col-sm-6 col-md-3 mb-4 animate__animated animate__fadeInUp"
          style={{ animationDelay: `${i * 0.2}s` }}
        >
          <div className="card border-0 shadow-lg rounded-4 h-100 teaching-card overflow-hidden">
            <div className="overflow-hidden">
              <img
                src={method.img}
                alt={method.title}
                className="card-img-top img-fluid"
              />
            </div>
            <div className="card-body bg-white text-dark">
              <h5 className="fw-bold gradient-text mb-2">{method.title}</h5>
              <p className="text-muted small mb-0">{method.desc}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>

  <style jsx>{`
    .teaching-card {
      transition: all 0.4s ease;
      border-radius: 20px;
    }
    .teaching-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25);
    }
    .card-img-top {
      height: 180px;
      object-fit: cover;
      transition: transform 0.4s ease;
    }
    .teaching-card:hover .card-img-top {
      transform: scale(1.08);
    }
    .gradient-text {
      background: linear-gradient(135deg, #ffca28, #ff6f00);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  `}</style>
</section>



<section
        id="curriculum"
        className="py-5 text-center text-light position-relative"
        style={{
          background: "linear-gradient(135deg, #6610f2 0%, #0d6efd 100%)",
          overflow: "hidden",
        }}
      >
        {/* Decorative waves */}
        <div
          className="position-absolute top-0 start-0 w-25 h-25 bg-warning opacity-10 rounded-circle blur-lg"
          style={{ zIndex: 1 }}
        ></div>
        <div
          className="position-absolute bottom-0 end-0 w-25 h-25 bg-info opacity-10 rounded-circle blur-lg"
          style={{ zIndex: 1 }}
        ></div>

        <div className="container position-relative" style={{ zIndex: 2 }}>
          <h2 className="fw-bold mb-4 animate__animated animate__fadeInDown">
            Curriculums We Handle
          </h2>
          <p className="lead mb-5 animate__animated animate__fadeInUp">
            Our tutors specialize across a wide range of educational systems — ensuring you get the right match for your goals.
          </p>

          <div className="row justify-content-center">
            {[
              {
                icon: "bi bi-book-half",
                title: "Kenyan CBC & 8-4-4",
                desc: "We prepare students for KNEC, KCPE, and KCSE with a strong foundation in core subjects.",
              },
              {
                icon: "bi bi-globe2",
                title: "IGCSE & Cambridge",
                desc: "Tailored lessons that meet international school standards for O-Level and A-Level students.",
              },
              {
                icon: "bi bi-award-fill",
                title: "IB Curriculum",
                desc: "Personalized tutoring in the International Baccalaureate framework, focusing on inquiry-based learning.",
              },
              {
                icon: "bi bi-lightbulb",
                title: "SAT, ACT & College Prep",
                desc: "We help learners aiming to study abroad excel in standardized exams and essay writing.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="col-12 col-sm-6 col-md-3 mb-4 animate__animated animate__zoomIn"
                style={{ animationDelay: `${i * 0.3}s` }}
              >
                <div className="card border-0 shadow-lg rounded-4 p-4 h-100 bg-white text-dark curriculum-card">
                  <div className="icon-circle mx-auto mb-3">
                    <i className={`${item.icon} fs-2 text-primary`}></i>
                  </div>
                  <h5 className="fw-bold gradient-text mb-2">{item.title}</h5>
                  <p className="text-muted small mb-0">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
 <style jsx>{`
          .curriculum-card {
            transition: all 0.4s ease;
          }
          .curriculum-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
          }
          .icon-circle {
            width: 70px;
            height: 70px;
            background: linear-gradient(135deg, #ffca28, #ff6f00);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            transition: transform 0.3s ease;
          }
          .curriculum-card:hover .icon-circle {
            transform: rotate(10deg) scale(1.1);
          }
          .gradient-text {
            background: linear-gradient(135deg, #ffca28, #ff6f00);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .blur-lg {
            filter: blur(80px);
          }
        `}</style>
      </section>


{/* ================= GET STARTED ================= */}
<section
  className="py-5 text-center text-white position-relative"
  style={{
    background: "linear-gradient(135deg, #5a00e0 0%, #e83e8c 100%)",
    overflow: "hidden",
  }}
>
  {/* Decorative bottom wave */}
  <div
    style={{
      position: "absolute",
      bottom: "-1px",
      left: 0,
      width: "100%",
      height: "100px",
      background: "url('https://www.svgrepo.com/show/347296/wave-top.svg') no-repeat center/cover",
      opacity: 0.25,
    }}
  ></div>

  {/* Glow effect */}
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background:
        "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.15) 0%, transparent 60%)",
      zIndex: 1,
    }}
  ></div>

  <div className="container position-relative" style={{ zIndex: 2 }}>
    <h2 className="fw-bold display-5 mb-3 animate__animated animate__fadeInDown">
      Ready to Begin Your Learning Journey?
    </h2>

    <p className="fs-5 mb-4 animate__animated animate__fadeInUp">
      Join hundreds of students already thriving with{" "}
      <strong>TutorLink</strong>. Let’s unlock your full potential.
    </p>

    <a
      href="/tutors"
      className="btn btn-light btn-lg px-5 py-3 fw-semibold shadow-sm border-0 animate__animated animate__zoomIn"
      style={{
        borderRadius: "50px",
        transition: "all 0.3s ease",
      }}
      onMouseOver={(e) => (e.target.style.background = "#ffd54f")}
      onMouseOut={(e) => (e.target.style.background = "white")}
    >
       Find Your Tutor Now
    </a>
  </div>
</section>

     {/* ================= TESTIMONIALS ================= */}
<section
  className="py-5 text-center position-relative overflow-hidden"
  style={{ background: "linear-gradient(135deg, #e8f1ff, #f4f8ff)" }}
>
  {/* Decorative background shapes */}
  <div className="position-absolute top-0 start-0 w-25 h-25 bg-primary opacity-10 rounded-circle blur-lg"></div>
  <div className="position-absolute bottom-0 end-0 w-25 h-25 bg-info opacity-10 rounded-circle blur-lg"></div>

  <div className="container position-relative" style={{ zIndex: 2 }}>
    <h2 className="fw-bold mb-2 animate__animated animate__fadeInDown text-primary">
      What Our Students Say
    </h2>
    <p className="text-muted mb-5 animate__animated animate__fadeInUp" style={{ maxWidth: "600px", margin: "0 auto" }}>
      We’re proud to have helped countless students reach their academic goals. Here’s what some of them had to say about their experience with <strong>TutorLink</strong>.
    </p>

    <div className="row justify-content-center">
      {[
        {
          name: "Alice W.",
          role: "Student",
          text: "TutorLink helped me improve my grades dramatically. Lessons are clear and engaging!",
          img: "/images/2.jpg"
        },
        {
          name: "David K.",
          role: "Student",
          text: "The tutors are professional, supportive, and flexible with schedules. I gained confidence fast!",
          img: "/images/3.jpg"
        },
        {
          name: "Peter J.",
          role: "Parent",
          text: "My son loves his classes! I appreciate the personalized attention and follow-up from tutors.",
          img: "/images/peter.jpg"
        }
      ].map((testimonial, i) => (
        <div
          key={i}
          className="col-12 col-md-4 mb-4 animate__animated animate__fadeInUp"
          style={{ animationDelay: `${i * 0.3}s` }}
        >
          <div className="card border-0 shadow-lg rounded-4 p-4 testimonial-card h-100 position-relative">
            {/* Floating quote icon */}
            <div className="quote-icon text-primary position-absolute top-0 start-50 translate-middle-x">
              <i className="bi bi-quote fs-1 opacity-25"></i>
            </div>

            <img
              src={testimonial.img}
              alt={testimonial.name}
              className="rounded-circle mb-3 testimonial-img"
            />
            <p className="fst-italic text-muted px-2">“{testimonial.text}”</p>
            <h6 className="fw-bold mb-0 mt-3">{testimonial.name}</h6>
            <small className="text-primary">{testimonial.role}</small>
          </div>
        </div>
      ))}
    </div>
  </div>

  <style jsx>{`
    .testimonial-card {
      background: #ffffff;
      transition: all 0.4s ease;
      border-top: 4px solid #0d6efd;
    }
    .testimonial-card:hover {
      transform: translateY(-6px) scale(1.02);
      box-shadow: 0 20px 30px rgba(0, 0, 0, 0.15);
      border-top-color: #0a58ca;
    }
    .testimonial-img {
      width: 90px;
      height: 90px;
      object-fit: cover;
      border: 3px solid #0d6efd;
      padding: 3px;
      transition: transform 0.3s ease, border-color 0.3s ease;
    }
    .testimonial-img:hover {
      transform: scale(1.08);
      border-color: #6610f2;
    }
    .quote-icon {
      top: -20px;
      left: 50%;
    }
    .blur-lg {
      filter: blur(80px);
    }
    @media (max-width: 768px) {
      h2 {
        font-size: 1.9rem;
      }
      .testimonial-img {
        width: 75px;
        height: 75px;
      }
    }
  `}</style>
</section>

      {/* ================= FOOTER ================= */}
      <footer
        className="footer-section text-white text-center py-5 position-relative"
        style={{ background: "linear-gradient(135deg, #0d6efd, #6610f2)" }}
      >
        <div className="container">
          <div className="mb-4">
            <a href="#facebook" className="text-white me-3 social-icon">
              <i className="bi bi-facebook fs-4"></i>
            </a>
            <a href="#instagram" className="text-white me-3 social-icon">
              <i className="bi bi-instagram fs-4"></i>
            </a>
            <a href="#whatsapp" className="text-white social-icon">
              <i className="bi bi-whatsapp fs-4"></i>
            </a>
          </div>
          <p className="small mb-1">Empowering students through personalized learning experiences.</p>
          <p className="mb-0">
            © {new Date().getFullYear()} <strong className="text-info">TutorLink</strong> | Designed by{" "}
            <strong className="text-warning">Eula Shalet</strong>
          </p>
        </div>
      </footer>

      {/* ================= CHAT POPUP ================= */}
      <button className="chat-btn position-fixed" onClick={() => setShowChat(!showChat)}>
        <i className="bi bi-chat-dots-fill"></i>
      </button>

      {showChat && (
        <div className="chat-popup position-fixed">
          <div className="chat-header bg-primary text-white d-flex justify-content-between align-items-center p-2">
            <span>Chat with TutorLink</span>
            <button className="btn btn-sm btn-light" onClick={() => setShowChat(false)}>
              ×
            </button>
          </div>
          <div className="chat-body p-3" style={{ maxHeight: "250px", overflowY: "auto" }}>
            {messages.map((msg, i) => (
              <div key={i} className={`chat-msg ${msg.fromUser ? "user" : "bot"}`}>
                <p className="p-2 rounded">{msg.text}</p>
              </div>
            ))}
          </div>
          <div className="p-2 border-top">
            <div className="d-flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="form-control me-2"
                placeholder="Type message..."
              />
              <button className="btn btn-primary" onClick={sendMessage}>
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= CSS ================= */}
      <style jsx>{`
        .highlight-text {
          color: #ffc107;
          text-shadow: 0 2px 10px rgba(255, 193, 7, 0.6);
        }
        .hero-section .btn-warning {
          transition: all 0.3s ease;
        }
        .hero-section .btn-warning:hover {
          background-color: #ffca2c;
          transform: translateY(-3px);
          box-shadow: 0 6px 15px rgba(255, 193, 7, 0.4);
        }
        .btn-outline-light:hover {
          background-color: #fff;
          color: #212529;
          transform: translateY(-3px);
        }

        .floating-shape {
          position: absolute;
          border-radius: 50%;
          opacity: 0.3;
          animation: float 8s ease-in-out infinite;
        }
        .shape-1 {
          width: 150px;
          height: 150px;
          background: #0d6efd;
          top: 20%;
          left: 10%;
        }
        .shape-2 {
          width: 200px;
          height: 200px;
          background: #ffc107;
          bottom: 15%;
          right: 10%;
          animation-delay: 2s;
        }
        @keyframes float {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-30px);
          }
          100% {
            transform: translateY(0);
          }
        }

        .social-icon:hover {
          color: #ffc107 !important;
          transform: scale(1.2);
          transition: all 0.3s ease;
        }

        .chat-btn {
          bottom: 30px;
          right: 30px;
          background: #25d366;
          color: white;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          font-size: 1.8rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          z-index: 1000;
        }
        .chat-popup {
          bottom: 100px;
          right: 30px;
          width: 300px;
          background: white;
          border-radius: 15px;
          box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
          overflow: hidden;
          z-index: 999;
        }
        .chat-msg p {
          background: #f1f1f1;
          display: inline-block;
          max-width: 85%;
        }
        .chat-msg.user p {
          background: #007bff;
          color: white;
          margin-left: auto;
        }
        .chat-msg.bot p {
          background: #e9ecef;
          color: #333;
          margin-right: auto;
        }

        @media (max-width: 768px) {
          .hero-section {
            height: 70vh;
            background-position: center top;
          }
          h1 {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
}
