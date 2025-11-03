// src/pages/MyBookings.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./MyBookings.css";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentMessage, setPaymentMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("userToken");
        if (!token) return navigate("/login");

        const { data } = await axios.get("http://localhost:5000/api/bookings/my", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(data);
      } catch (err) {
        console.error(err);
        setError("Could not fetch your bookings.");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [navigate]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    try {
      const token = localStorage.getItem("userToken");
      await axios.delete(`http://localhost:5000/api/bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(bookings.filter((b) => b._id !== id));
      alert("Booking cancelled!");
    } catch (err) {
      console.error(err);
      alert("Failed to cancel booking.");
    }
  };

  const handlePayment = async (booking) => {
    let phone = prompt("Enter phone number (2547XXXXXXXX):");
    if (!phone) return;

    phone = phone.toString().trim().replace(/\s+/g, "");
    if (phone.startsWith("+")) phone = phone.slice(1);
    if (phone.startsWith("0") && phone.length === 10) phone = "254" + phone.slice(1);
    if (/^7\d{8}$/.test(phone)) phone = "254" + phone;

    if (!/^254\d{9}$/.test(phone)) {
      alert("Phone number must be in format 2547XXXXXXXX");
      return;
    }

    try {
      setPaymentMessage("Processing payment...");
      const token = localStorage.getItem("userToken");

      const { data } = await axios.post(
        "http://localhost:5000/api/payments/stkpush",
        {
          amount: booking.amount || 10,
          phoneNumber: phone,
          bookingId: booking._id,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.ResponseCode === "0" || data.responseCode === "0") {
        setPaymentMessage("✅ Payment successful! Thank you for booking.");
        // Mark booking as paid locally
        setBookings((prev) =>
          prev.map((b) =>
            b._id === booking._id ? { ...b, isPaid: true } : b
          )
        );
      } else {
        const msg =
          data.error?.errorMessage ||
          data.ResponseDescription ||
          data.message ||
          JSON.stringify(data);
        setPaymentMessage(`❌ Payment failed: ${msg}`);
      }
    } catch (err) {
      console.error("Payment request error:", err.response?.data || err.message);
      const serverMsg =
        err.response?.data?.error?.errorMessage ||
        err.response?.data?.error ||
        err.response?.data?.message;
      setPaymentMessage(`❌ Payment failed: ${serverMsg || err.message}`);
    }
  };

  return (
    <div className="bookings-page position-relative">
      <div className="overlay"></div>
      <div className="container mt-5 position-relative z-2">
        <h2 className="text-center text-warning mb-2">My Bookings</h2>
        <p className="bookings-text text-center">
          View, cancel, or pay for your tutoring sessions.
        </p>

        {paymentMessage && (
          <div className="alert alert-info text-center mt-3">{paymentMessage}</div>
        )}
        {loading && <p className="text-center text-light">Loading...</p>}
        {error && <p className="text-center text-danger">{error}</p>}

        {!loading && !error && (
          bookings.length === 0 ? (
            <p className="text-center text-light">No bookings yet.</p>
          ) : (
            <div className="row">
              {bookings.map((b) => (
                <div key={b._id} className="col-md-6 mb-4">
                  {b.tutorId ? (
                    <div className="card booking-card shadow-sm h-100">
                      <div className="card-body d-flex flex-column justify-content-between">
                        <div>
                          <h5 className="card-title">{b.tutorId.name}</h5>
                          <p className="card-subtitle mb-2">{b.tutorId.subject}</p>
                          <p className="booking-info mb-0">
                            Date: {new Date(b.date).toLocaleDateString()} <br />
                            Time:{" "}
                            {new Date(b.date).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                        <div className="mt-3 d-flex gap-2 justify-content-between align-items-center">
                          {b.isPaid ? (
                            <span className="badge bg-success px-3 py-2 fs-6 glow-success">
                              ✅ Paid
                            </span>
                          ) : (
                            <>
                              <button
                                className="btn btn-success flex-grow-1"
                                onClick={() => handlePayment(b)}
                              >
                                Pay Now
                              </button>
                              <button
                                className="btn btn-cancel flex-grow-1"
                                onClick={() => handleDelete(b._id)}
                              >
                                Cancel Booking
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="card p-3 shadow-sm bg-light">
                      <p className="text-muted mb-0">Tutor no longer available.</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}
