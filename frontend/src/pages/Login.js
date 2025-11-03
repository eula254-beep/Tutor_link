import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const { data } = await axios.post(`${API_URL}/api/users/login`, {
        email,
        password,
      });

      localStorage.setItem("userToken", data.token);
      localStorage.setItem("userInfo", JSON.stringify(data.user));

      setSuccess("Login successful! Redirecting...");

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card-wrapper">
        <div className="login-card shadow rounded animate-card">
          <h2 className="text-center mb-2 animate-title">Welcome Back</h2>
          <p className="text-center text-muted mb-4 small-text">
            Enter your email and password to access your account
          </p>

          {success && <div className="alert alert-success text-center">{success}</div>}
          {error && <div className="alert alert-danger text-center">{error}</div>}

          <form onSubmit={handleSubmit} className="login-form">
            {/* Email with icon */}
            <div className="form-floating mb-3 position-relative">
              <input
                type="email"
                className="form-control ps-5"
                id="floatingEmail"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="floatingEmail">Email</label>
              <i className="bi bi-person-fill position-absolute icon-email"></i>
            </div>

            {/* Password with lock icon */}
            <div className="form-floating mb-4 position-relative">
              <input
                type="password"
                className="form-control ps-5"
                id="floatingPassword"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="floatingPassword">Password</label>
              <i className="bi bi-lock-fill position-absolute icon-password"></i>
            </div>

            <button type="submit" className="btn btn-primary w-100 btn-login animate-button">
              Login
            </button>
          </form>

          <p className="text-center mt-3">
            Don't have an account? <a href="/register">Sign up</a>
          </p>
        </div>
      </div>

      {/* Internal CSS */}
      <style>{`
        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .login-page {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(270deg, #6c5ce7, #00b894, #00d2ff);
          background-size: 600% 600%;
          animation: gradientBG 15s ease infinite;
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .login-card-wrapper {
          width: 100%;
          max-width: 400px;
        }

        .login-card {
          background-color: #fff;
          border-radius: 15px;
          padding: 35px 30px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .animate-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 30px rgba(0, 0, 0, 0.25);
        }

        .animate-title {
          animation: fadeInTop 0.8s ease forwards;
        }

        @keyframes fadeInTop {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .animate-button {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .animate-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }

        .login-card input:focus {
          border-color: #6c5ce7;
          box-shadow: 0 0 0 2px rgba(108, 92, 231, 0.2);
        }

        .form-floating > label {
          transition: all 0.2s ease;
          color: #6c5ce7;
        }

        .form-floating > input:focus ~ label,
        .form-floating > input:not(:placeholder-shown) ~ label {
          transform: translateY(-1.5rem) scale(0.85);
          opacity: 0.85;
          color: #6c5ce7;
        }

        .alert {
          border-radius: 10px;
        }

        .login-card a {
          color: #6c5ce7;
          text-decoration: none;
        }

        .login-card a:hover {
          text-decoration: underline;
        }

        .small-text {
          font-size: 0.875rem;
          color: #6c5ce7;
        }

        /* Icons inside inputs */
        .icon-email, .icon-password {
          top: 50%;
          left: 15px;
          transform: translateY(-50%);
          color: #6c5ce7;
          font-size: 1rem;
          pointer-events: none;
        }

        .form-control.ps-5 {
          padding-left: 2.5rem !important;
        }
      `}</style>
    </div>
  );
}
