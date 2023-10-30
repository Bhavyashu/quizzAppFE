import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faGoogle,
  faInstagram,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import {
  faGem,
  faHome,
  faEnvelope,
  faPhone,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";


/**
 * App is a React component that represents the footer section of a web page.
 *
 * @returns {JSX.Element} The rendered footer component.
 */


export default function Footer() {
  return (
    <footer className="bg-#1A1A2E text-center text-lg-start text-muted">
      <section
        className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom"
        style={{ backgroundColor: "#1A1A2E", color: "white" }}
      >
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href="#" className="me-4 text-reset">
            <FontAwesomeIcon icon={faFacebookF} size="lg" color="white" />
          </a>
          <span> </span>
          <a href="#" className="me-4 text-reset">
            <FontAwesomeIcon icon={faTwitter} size="lg" color="white" />
          </a>
          <span> </span>
          <a href="#" className="me-4 text-reset">
            <FontAwesomeIcon icon={faInstagram} size="lg" color="white" />
          </a>
          <span> </span>
          <a href="#" className="me-4 text-reset">
            <FontAwesomeIcon icon={faLinkedin} size="lg" color="white" />
          </a>
          <span> </span>
          <a href="#" className="me-4 text-reset">
            <FontAwesomeIcon icon={faGithub} size="lg" color="white" />
          </a>
        </div>
      </section>

      <section className="">
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <FontAwesomeIcon icon={faGem} className="me-3" />
                QUIZZ App
              </h6>
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Created By</h6>
              <p>Bhavyashu Agarwal</p>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <FontAwesomeIcon icon={faHome} className="me-2" />
                <span> </span>
                KMIT, Narayanaguda, Hyderabad
              </p>
              <p>
                <FontAwesomeIcon icon={faEnvelope} className="me-3" />
                <span> </span>
                Bhavyashu@gmail.com
              </p>
              <p>
                <FontAwesomeIcon icon={faPhone} className="me-3" />
                <span> </span> + 01 234 567 89
              </p>
            </div>
          </div>
        </div>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: '#1A1A2E', color: "white" }}
      >
        © 2023 Copyright:
        <a className="text-reset fw-bold">
          <span> </span> QUIZZ App
        </a>
      </div>
    </footer>
  );
}
