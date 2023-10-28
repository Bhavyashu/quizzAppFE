import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logoutImage from "../images/logout.png";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
    // window.location.reload();
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
        className="navbar navbar-expand-md navbar-light fixed-top"
        style={{
          backgroundColor: "#2b2b2b", // Dark background color
          borderBottom: "2px solid #4a90e2", // Blue border at the bottom
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
                  color: "#4a90e2", // New text color
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
                  color: "#4a90e2", // New text color
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
                    color: "#ce5a67",
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
            <form className="my-2 my-lg-0 pr-3">
              <a
                className="btn my-2 my-sm-0"
                style={{
                  backgroundColor: "#4a90e2", // Blue button background
                  color: "#eeeeee", // White text color
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
            <div className="btn-group">
              <button
                className="btn btn-secondary btn-sm dropdown-toggle"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                style={{
                  color: "#12486B",
                }}
              >
                {/* <img src={userProfileImage} alt="User Profile" /> */}
                 More options
                  {/* here */}
              </button>
              <div className="dropdown-menu">
                <div className="dropdown-divider"></div>
                <button
                  className="dropdown-item secondary"
                  onClick={handleLogOut}
                  style={{
                    color: "#ff6b81",
                  }}
                >
                  {/* <img src={logoutImage} alt="Logout" /> */}
                   Logout
                </button>
                <button
                  className="dropdown-item secondary"
                  // onClick={handleUserProfile}
                >
                  {/* <img src={userProfileImage} alt="UserProfile" /> */}
                  UserProfile 
                </button>
                <button
                  className="dropdown-item secondary"
                  // onClick={handleUpdateProfile}
                >
                  {/* <img src={updateProfileImage} alt="UpdateProfile" />{" "} */}
                  UpdateProfile
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