import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Tutors from "./pages/Tutors";
import AddTutor from "./pages/AddTutor";
import Contact from "./pages/Contact";
import TutorProfile from "./pages/TutorProfile";
import BookSessionF from "./pages/BookSessionF";
import MyBookings from "./pages/MyBookings";
import Register from "./pages/register";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Navbar />

      <div className="container mt-5 pt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/tutors" element={<Tutors />} />
          <Route path="/add-tutor" element={<AddTutor />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/tutor/:tutorId" element={<TutorProfile />} />

          {/* Authentication */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Bookings */}
          <Route path="/book" element={<BookSessionF />} />
          <Route path="/book/:tutorId" element={<BookSessionF />} />
          <Route path="/my-bookings" element={<MyBookings />} />

          {/* Catch-all fallback */}
          <Route
            path="*"
            element={<p className="text-center mt-5">Page Not Found</p>}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
