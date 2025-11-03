import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    checkPasswordStrength(val);
  };

  const checkPasswordStrength = (pass) => {
    if (!pass) {
      setPasswordStrength("");
      return;
    }
    if (pass.length < 6) {
      setPasswordStrength("Weak");
    } else if (pass.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)) {
      setPasswordStrength("Medium");
    } else if (pass.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)) {
      setPasswordStrength("Strong");
    } else {
      setPasswordStrength("Medium");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const { data } = await axios.post("http://localhost:5000/api/users/register", {
        name,
        email,
        password,
      });

      localStorage.setItem("userToken", data.token);
      localStorage.setItem("userInfo", JSON.stringify(data.user));

      setSuccess("Registration successful! Redirecting to home...");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <div className="register-page">
      <div className="register-card-wrapper">
        <div className="register-card shadow rounded animate-card">
          <h2 className="text-center mb-2 animate-title">Create Account</h2>
          <p className="text-center text-muted mb-4 small-text">
            Fill in the form to create your account
          </p>

          {success && <div className="alert alert-success text-center">{success}</div>}
          {error && <div className="alert alert-danger text-center">{error}</div>}

          <form onSubmit={handleSubmit} className="register-form">
            {/* Name */}
            <div className="form-floating mb-3 position-relative">
              <input
                type="text"
                className="form-control ps-5"
                id="floatingName"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label htmlFor="floatingName">Your Name</label>
                          </div>

            {/* Email */}
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
              
            </div>

            {/* Password */}
            <div className="form-floating mb-2 position-relative">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control ps-5"
                id="floatingPassword"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <label htmlFor="floatingPassword">Password</label>
                           <i
                className={`bi ${showPassword ? "bi-eye-slash-fill" : "bi-eye-fill"} toggle-password`}
                onClick={togglePassword}
              ></i>
            </div>

            {/* Password strength */}
            {password && (
              <div className={`mb-3 password-strength ${passwordStrength.toLowerCase()}`}>
                Strength: {passwordStrength}
              </div>
            )}

            <button type="submit" className="btn btn-primary w-100 btn-register animate-button">
              Register
            </button>
          </form>

          <p className="text-center mt-3">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .register-page {
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

        .register-card-wrapper {
          width: 100%;
          max-width: 400px;
        }

        .register-card {
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

        .register-card input:focus {
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

        .register-card a {
          color: #6c5ce7;
          text-decoration: none;
        }

        .register-card a:hover {
          text-decoration: underline;
        }

        .small-text {
          font-size: 0.875rem;
          color: #6c5ce7;
        }

        .icon-name, .icon-email, .icon-password {
          top: 50%;
          left: 15px;
          transform: translateY(-50%);
          color: #6c5ce7;
          font-size: 1rem;
          pointer-events: none;
        }

        .toggle-password {
          top: 50%;
          right: 15px;
          transform: translateY(-50%);
          position: absolute;
          color: #6c5ce7;
          cursor: pointer;
        }

        .form-control.ps-5 {
          padding-left: 2.5rem !important;
        }

        /* Password strength colors */
        .password-strength {
          font-weight: bold;
          font-size: 0.875rem;
        }
        .password-strength.weak { color: #e74c3c; }
        .password-strength.medium { color: #f39c12; }
        .password-strength.strong { color: #2ecc71; }
      `}</style>
    </div>
  );
}
