import React from "react";
import { Link } from "react-router-dom";

function NavBar() {

  const isAuthenticated = localStorage.getItem("authToken");

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary fixed-top" style={{ height: '10vh' }} data-bs-theme="dark">
      {isAuthenticated ? (
        <>
          <Link to={"/show_course"} className="navbar-brand ms-auto">Show Courses</Link>
          <Link to={"/course_form"} className="navbar-brand">Add Course</Link>
        </>
      ) : (
        <>
          <Link to={"/"} className="navbar-brand ms-auto">Sign Up</Link>
          <Link to={"/sign_in"} className="navbar-brand">Sign In</Link>
        </>
      )}
    </nav>
  );
}

export default NavBar;
