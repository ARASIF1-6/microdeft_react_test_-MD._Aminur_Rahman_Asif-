import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    "email": "",
    "password": "",
  });

  const [responseMessage, setResponseMessage] = useState("");
  const [token, setToken] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://react-interview.crd4lc.easypanel.host/api/login",
        formData, { headers: { 'Accept': 'application/json' } }
      );
      const receivedToken = response.data;
      console.log(receivedToken);
      setToken(receivedToken.token);
      setResponseMessage("Login successful!");
      localStorage.setItem("authToken", receivedToken.token);
      navigate("/show_course");
    } catch (error) {
      setResponseMessage(
        error.response?.data?.message || "An error occurred during login."
      );
    }
  };

  return (
    <>
    {responseMessage && (
      <div className="alert mt-3 alert-info">{responseMessage}</div>
    )}
    <div className="container mt-5 card shadow" style={{ width: '28rem', height: '26rem' }}>
      <h2>Login Form</h2> <hr></hr>
      <form onSubmit={handleSubmit} className="mt-1 d-flex flex-column align-items-center">
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
            style={{ width: '20rem' }}
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
            style={{ width: '20rem' }}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-lg fw-bold" style={{ width: '10rem' }}>Login</button>
      </form>
      <Link to={"/"} className="mt-3">Create a account</Link>
      {token && (
        <div className="alert mt-3 alert-success">
          Authentication Token: {token}
        </div>
      )}
    </div>
    </>
  );
};

export default SignIn;
