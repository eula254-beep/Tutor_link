// src/components/TutorCard.js
import React from "react";

export default function TutorCard({ tutor, onDelete }) {
  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h5 className="card-title">{tutor.name}</h5>
        <p className="card-text">
          <strong>Subject:</strong> {tutor.subject} <br />
          <strong>Rate:</strong> KES {tutor.rate}/hr <br />
          <strong>Rating:</strong> ⭐ {tutor.rating}/5
        </p>
        <p>{tutor.description}</p>

        <div className="d-flex justify-content-between">
          <a href={`/tutors/${tutor._id}`} className="btn btn-sm btn-outline-primary">
            👁 View
          </a>
          <a href={`/edit-tutor/${tutor._id}`} className="btn btn-sm btn-outline-success">
            ✏ Edit
          </a>
          <button
            onClick={() => onDelete(tutor._id)}
            className="btn btn-sm btn-outline-danger"
          >
            <a href={`/book/${tutor._id}`} className="btn btn-outline-primary mt-2">
  Book Session
</a>

            🗑 Delete
          </button>
        </div>
      </div>
    </div>
  );
}
