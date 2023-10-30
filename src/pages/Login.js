import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory
import base_url from "../constants";
import toast from "react-hot-toast";


/**
 * Login is a React component that handles user login.
 *
 * @returns {JSX.Element} The rendered Login component.
 */
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // Use useNavigate instead of useHistory

   /**
   * Handles changes in the username input field.
   * @param {Object} event - The input change event.
   */
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
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
      email: username,
      password: password,
    };
    const requestBodyJSON = JSON.stringify(requestBody);

    // Calculate the content length
    const contentLength = new TextEncoder().encode(requestBodyJSON).length;

    const response = await fetch(`${base_url}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": contentLength.toString(), // Add Content-Length to the headers
      },
      body: requestBodyJSON,
    });

    if (response.status === 200) {
      const data = await response.json();

      try {
        localStorage.setItem("token", data.data.accessToken);
        localStorage.setItem("email", data.data.email);
        localStorage.setItem("name", data.data.name);
        // localStorage.setItem("languages", data.data.language);
        toast.success("Successfully logged in");
        // Introduce a delay of 1000 milliseconds (1 second)
        setTimeout(() => {
          navigate('/dashboard');
          window.location.reload();
        }, 1000);
      } catch (error) {
        console.error("Error setting token in localStorage:", error);
      }
    } else {
      const data = await response.json();
      toast.error(`Error : ${data.message}`);
      const token = data.my_token;
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
              <label htmlFor="username" style={labelStyle}>
                Email:
              </label>
              <input
                type="text"
                id="username"
                className="form-control"
                placeholder="Enter username"
                onChange={handleUsernameChange}
                value={username}
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