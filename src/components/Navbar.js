import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NavigationDropdown from './common/navbarDropdown'; // Create this component


/**
 * NavigationBar is a React component that represents the navigation bar of a web application.
 *
 * @returns {JSX.Element} The rendered navigation bar component.
 */
const NavigationBar = () => {
  const [userToken, setUserToken] = useState(localStorage.getItem('token'));
  const [userRole, setUserRole] = useState(localStorage.getItem('role'));

  const navigate = useNavigate();

  useEffect(() => {
    setUserToken(localStorage.getItem('token'));
    setUserRole(localStorage.getItem('role'));
  }, []);

  /**
   * Handles the logout action.
   */
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-light fixed-top" style={{ backgroundColor: "#2b2b2b" }}>
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
              <Link to="/" className="nav-link pl-4 pr-4" style={{ color: "#ffffff" }}>
                Home
              </Link>
            </li>
            {userToken && (
              <>
                <li className="nav-item">
                  <Link to="/dashboard" className="nav-link pl-2 pr-4" style={{ color: "#ffffff" }}>
                    Dashboard
                  </Link>
                </li>
                  <li className="nav-item">
                    <Link to="/leaderboard" className="nav-link pl-2 pr-4" style={{ color: "#ffffff" }}>
                      Leaderboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/userProgress" className="nav-link pl-2 pr-4" style={{ color: "#ffffff" }}>
                      Progress
                    </Link>
                  </li>  
              </>
            )}
          </ul>
          {userToken ? (
            <NavigationDropdown onLogout={handleLogOut} />
          ) : (
            <form className="my-2 my-lg-0 pr-3">
              <Link to="/login" className="btn my-2 my-sm-0" style={{ backgroundColor: "#4a90e2", color: "#ffffff" }}>
                Login
              </Link>
            </form>
          )}
        </div>
      </nav>
    </div>
  );
  
};

export default NavigationBar;