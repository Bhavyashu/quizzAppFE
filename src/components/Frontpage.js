import React from "react";

import homepage from "../images/homepage.png";
import { Link } from "react-router-dom";

import Footer from "./Footer";

/**
 * FrontPage is a React component that represents the front page of a web application.
 *
 * @returns {JSX.Element} The rendered front page component.
 */
const FrontPage = () => {
  return (
    <div className="pt-3 mb-3 pb-2" style={{ backgroundColor: "#1A1A2E" }}>
      <div className="container-fluid pt-5 pb-5">
        <div
          className="row justify-content-center align-items-center"
          style={{ paddingTop: "10px" }}
        >
          <div className="col-lg-7 order-lg-1">
            <img
              src={homepage}
              alt=""
              className="img-fluid"
              style={{
                objectFit: "cover",
                borderRadius: "20px",
                maxWidth: "100%",
              }}
            />
          </div>
          <div className="col-lg-5 order-lg-2">
            <div
              className="card shadow bg-white rounded-5"
              style={{
                backgroundColor: "#eeeeee",
                padding: "50px",
                borderRadius: "40px",
                textAlign: "center",
                margin: 3,
              }}
            >
              <h3
                style={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "24px",
                  margin: "10px 0",
                }}
              >
                Increase Your Language proficiency, and improve your
                communication skills
              </h3>
              <div style={{ textAlign: "center" }}>
                {localStorage.getItem("token") === null ? (
                  <Link
                    className="btn my-2 my-sm-0 shadow rounded"
                    style={{
                      backgroundColor: "#4455a4",
                      color: "#eeeeee",
                      fontWeight: "bold",
                      fontSize: "18px",
                      width: "100%",
                      maxWidth: "220px",
                      marginTop: "20px",
                    }}
                    type="submit"
                    to="/register"
                  >
                    Sign Up
                  </Link>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default FrontPage;
