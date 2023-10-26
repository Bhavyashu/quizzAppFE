import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const Navbar = () => {
  //   const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.clear();
    // navigate("/");
    window.location.reload();
  };
  const handleProfile = () => {
    if (localStorage.getItem("role") === "student") {
      //   navigate("/studentProfile");
    } else {
      //   navigate("/professionalProfile");
    }
  };
  return (
    <div>
      <nav
        className="navbar navbar-expand-md h-5 py-1 fixed-top"
        style={{
          backgroundColor: "#eeeeee",
          borderBottom: "2px solid grey", // Add black border at the bottom
        }}
      >
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a
                href="/"
                className="nav-link pl-4 pr-4"
                style={{
                  color: "#4455a4",
                  fontWeight: "bold",
                  fontSize: "22px",
                }}
              >
                Home
              </a>
            </li>
            {localStorage.getItem("email") && (
              <a
                href="/dashboard"
                className="nav-link pl-2 pr-4"
                style={{
                  color: "#4455a4",
                  fontWeight: "bold",
                  fontSize: "22px",
                }}
              >
                {" "}
                Dashboard{" "}
              </a>
            )}

            <li className="nav-item">
              {localStorage.getItem("role") === "student" && (
                <a
                  href="/ScheduledStudent"
                  className="nav-link pl-2 pr-4"
                  style={{
                    color: "#4455a4",
                    fontWeight: "bold",
                    fontSize: "22px",
                  }}
                >
                  {" "}
                  Dashboard{" "}
                </a>
              )}
            </li>
          </ul>
          {localStorage.getItem("token") === null && (
            <form className=" my-2 my-lg-0 pr-3">
              <a
                className="btn my-2 my-sm-0"
                style={{
                  backgroundColor: "#4455a4",
                  color: "#eeeeee",
                  fontWeight: "bold",
                  fontSize: "22px",
                }}
                type="submit"
                href="/Login"
              >
                Login
              </a>
            </form>
          )}
          {localStorage.getItem("token") && (
            <div class="btn-group">
              <button
                class="btn btn-secondary btn-sm dropdown-toggle"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                More options here
              </button>
              <div class="dropdown-menu">
                <div class="dropdown-divider"></div>
                <button
                  class="dropdown-item secondary"
                  href="#"
                  onClick={handleLogOut}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
