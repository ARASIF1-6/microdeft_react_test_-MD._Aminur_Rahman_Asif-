import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CourseForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    "title": "",
    "description": "",
    "badge_text": "",
    "badge_color": "",
    "instructor_name": "",
  });
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");
    if (!token) {
      setResponseMessage("Authentication token is missing! Please log in again.");
      return;
    }

    try {
      console.log("Using Token:", token);

      const response = await axios.post(
        "https://react-interview.crd4lc.easypanel.host/api/course",
        formData, { headers: { Authorization: `Bearer ${token}`, 'Accept': 'application/json'  },}
      );

      setResponseMessage("Course added successfully!");
      setFormData({
        "title": "",
        "description": "",
        "badge_text": "",
        "badge_color": "",
        "instructor_name": "",
      });
      navigate("/show_course");
    } catch (error) {
      console.error("Error adding course:", error.response);

      if (error.response?.status === 401) {
        setResponseMessage("Unauthenticated: Please log in again.");
        localStorage.removeItem("authToken");
      } else {
        setResponseMessage(
          error.response?.data?.message || "Failed to add the course."
        );
      }
    }
  };

  return (
    <div className="container mt-5 card shadow" style={{ width: '30rem', height: '37rem' }}>
      <h2>Add Course</h2>
      <form onSubmit={handleSubmit} className="mt-1 d-flex flex-column align-items-center">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            style={{ width: '20rem' }}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={{ width: '20rem' }}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="badge_text" className="form-label">
            Badge Text
          </label>
          <input
            type="text"
            className="form-control"
            id="badge_text"
            name="badge_text"
            value={formData.badge_text}
            onChange={handleChange}
            style={{ width: '20rem' }}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="badge_color" className="form-label">
            Badge Color
          </label>
          <input
            type="color"
            className="form-control"
            id="badge_color"
            name="badge_color"
            value={formData.badge_color}
            onChange={handleChange}
            style={{ width: '20rem' }}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="instructor_name" className="form-label">
            Instructor Name
          </label>
          <input
            type="text"
            className="form-control"
            id="instructor_name"
            name="instructor_name"
            value={formData.instructor_name}
            onChange={handleChange}
            style={{ width: '20rem' }}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-lg fw-bold" style={{ width: '10rem' }}>
          Submit
        </button>
      </form>
      {responseMessage && (
        <div className="alert mt-3 alert-info">{responseMessage}</div>
      )}
    </div>
  );
}

export default CourseForm;
