import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function SignUp() {
  const [formData, setFormData] = useState({
    "name": "",
    "email": "",
    "password": "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://react-interview.crd4lc.easypanel.host/api/register",
        formData, { headers: { 'Accept': 'application/json' } }
      );
      setResponseMessage(response.data.message || "Registration successful!");
    } catch (error) {
      setResponseMessage(
        error.response?.data?.message || "An error occurred during registration."
      );
    }
  };

  return (
    <>
    {responseMessage && (
      <div className="alert mt-3 alert-info">{responseMessage}</div>
    )}
    <div className="container mt-5 card shadow" style={{ width: '22rem', height: '30rem' }}>
      <h2>Create a new account</h2> <hr></hr>
      <form onSubmit={handleSubmit} className="mt-1 d-flex flex-column align-items-center">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{ width: '16rem' }}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{ width: '16rem' }}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{ width: '16rem' }}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-lg fw-bold" style={{ width: '10rem' }}> Sign Up </button>
      </form>
      <Link to={"/sign_in"} className="mt-3">Go to login page</Link>
    </div>
    </>
  );
};

export default SignUp;
