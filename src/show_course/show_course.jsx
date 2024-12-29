import React, { useEffect, useState } from "react";
import axios from "axios";
import './show_course.css'

const ShowCourse = () => {
  const [courses, setCourses] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setErrorMessage("Authentication token is missing!");
        return;
      }

      try {
        const response = await axios.get(
          "https://react-interview.crd4lc.easypanel.host/api/course",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCourses(response.data.data.data);
      } catch (error) {
        setErrorMessage(
          error.response?.data?.message || "Failed to fetch courses."
        );
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Course List</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <div className="card-container row">
        {courses.map((course) => (
          <div className="card col-2" key={course.id}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <span
              className="badge"
              style={{
                backgroundColor: course.badge_color,
                color: "#fff",
                padding: "5px 10px",
                borderRadius: "5px",
              }}
            >
              {course.badge_text}
            </span>
            <p><strong>Instructor:</strong> {course.instructor_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowCourse;
