import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory
import toast from "react-hot-toast";
import { post } from "../api/api";

/**
 * Login is a React component that handles user login.
 *
 * @returns {JSX.Element} The rendered Login component.
 */
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // Use useNavigate instead of useHistory

   /**
   * Handles changes in the email input field.
   * @param {Object} event - The input change event.
   */
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  /**
   * Handles changes in the password input field.
   * @param {Object} event - The input change event.
   */
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };


   /**
   * Handles the login process.
   * Makes an API request to log in the user.
   */
  const handleLogin = async (e) => {
    const requestBody = {
      email: email,
      password: password,
    };

    try {
    const data = await post(`/user/login`, requestBody);
        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("email", data.email);
        localStorage.setItem("name", data.name);
        toast.success("Successfully logged in");

        // Introduce a delay of 1000 milliseconds (1 second)
        setTimeout(() => {
          navigate('/dashboard');
          window.location.reload(); // reload so the navbar can show other things, there might be better solution than this ig
        }, 1000);
      } catch (error) {
        toast.error("Error signing in the user");
        console.error("Error signing in:", error);
      }
  };

  const labelStyle = {
    textAlign: "left",
    display: "block",
    marginBottom: "5px",
  };
  const imageStyle = {
    maxWidth: "95%",
    height: "90%",
  };

  const narrowerColStyle = {
    maxWidth: "400px",
    margin: "auto",
    padding: "20px",
  };
  const formStyle = {
    paddingLeft: "40px",
    paddingRight: "40px",
    paddingTop: 0,
    paddingBottom: 0,
  };
  return (
    <div className="container align-items-center justify-content-center vh-80 mt-5">
      <br></br>
      <br></br>
      <div className="row">
        <div
          className="col-md-8 col-lg-6 p-3 border rounded bg-white shadow"
          style={narrowerColStyle}
        >
          <h2 className="mb-4">Sign In</h2>
          <form style={formStyle}>
            <div className="form-group">
              <label htmlFor="email" style={labelStyle}>
                Email:
              </label>
              <input
                type="text"
                id="email"
                className="form-control"
                placeholder="Enter Email"
                onChange={handleEmailChange}
                value={email}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" style={labelStyle}>
                Password:
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Enter password"
                onChange={handlePasswordChange}
                value={password}
              />
            </div>
            <div className="mt-3"></div>
            <button
              type="button"
              className="btn btn-primary btn-block btn-lg mt-3"
              onClick={handleLogin}
            >
              Login
            </button>
          </form>
          <div className="mt-3" style={{ textAlign: "center" }}>
            Don't have an account?{" "}
            <Link
              className="text-primary"
              to="/Register"
            >
              Sign Up
            </Link>
          </div>
        </div>
        <div className="col-md-4 col-lg-6 p-4 ">
          <img
            style={imageStyle}
            alt="login"
            src="https://media.istockphoto.com/id/1281150061/vector/register-account-submit-access-login-password-username-internet-online-website-concept.jpg?s=612x612&w=0&k=20&c=9HWSuA9IaU4o-CK6fALBS5eaO1ubnsM08EOYwgbwGBo="
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
