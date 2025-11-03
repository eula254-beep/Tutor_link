import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function EditTutor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const API = `${API_URL}/api/tutors`;

  const [form, setForm] = useState({ name: "", subject: "", price: "", email: "", bio: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch tutor
  useEffect(() => {
    const fetchTutor = async () => {
      try {
        const res = await axios.get(`${API}/${id}`);
        if (!res.data) throw new Error("Tutor not found");
        const { name, subject, price, email, bio } = res.data;
        setForm({ name, subject, price, email, bio });
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || err.message || "Failed to load tutor");
      } finally {
        setLoading(false);
      }
    };
    fetchTutor();
  }, [id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.subject || !form.price || !form.email) {
      setError("Please fill all required fields");
      return;
    }

    try {
      const token = localStorage.getItem("userToken");
      await axios.put(`${API}/${id}`,
        { ...form, price: Number(form.price) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/tutors"); // redirect after successful update
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to update tutor");
    }
  };

  if (loading) return <p>Loading tutor info...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="container py-5">
      <h3 className="mb-4">Edit Tutor</h3>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name*</label>
          <input className="form-control" name="name" value={form.name} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Subject*</label>
          <input className="form-control" name="subject" value={form.subject} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Price (KES/hr)*</label>
          <input type="number" className="form-control" name="price" value={form.price} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Email*</label>
          <input className="form-control" name="email" value={form.email} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Bio</label>
          <textarea className="form-control" name="bio" value={form.bio} onChange={handleChange}></textarea>
        </div>
        <button className="btn btn-primary">Update Tutor</button>
      </form>
    </div>
  );
}
