import React from 'react';
import logoutImage from "../../images/logout.png";
import userProfileImage from "../../images/userProfile.png";
import updateProfileImage from "../../images/settings.png";
import { Link } from "react-router-dom";

/**
 * NavigationDropdown is a React component that renders a dropdown menu of navigation options.
 *
 * @param {Object} props - The component's properties.
 * @param {function} props.onLogout - A callback function to handle the logout action.
 *
 * @returns {JSX.Element} The rendered navigation dropdown component.
 */
const NavigationDropdown = ({ onLogout }) => {

  return (
    <div className="btn-group">
      <button
        className="btn btn-secondary btn-sm dropdown-toggle"
        type="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        style={{
          color: 'white',
        }}
      >
        More options
      </button>
      <div className="dropdown-menu custom-dropdown-menu">
        <div className="dropdown-divider"></div>
        <button
          className="dropdown-item secondary"
          onClick={onLogout}
          style={{
            color: '#ff6b81',
            display: 'flex',
            alignItems: 'center',
            marginBottom: '10px',
          }}
        >
          <img
            src={logoutImage}
            alt="Logout"
            style={{
              marginRight: '10px',
              width: '24px',
              height: '24px',
            }}
          />
          Logout
        </button>
        <div>
        <Link to='/userProgress' >
        <button
        
          className="dropdown-item secondary"
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '10px',
          }}
        >
          <img
            src={userProfileImage}
            alt="profile.svg"
            style={{
              marginRight: '10px',
              width: '24px',
              height: '24px',
            }}
          />
          Progress
        </button>
        </Link>
        <Link to='/userSettings' >
        <button
          className="dropdown-item secondary"
          // Add onClick handlers for other options
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '10px',
          }}
        >
          <img
            src={updateProfileImage}
            alt="update.svg"
            style={{
              marginRight: '10px',
              width: '24px',
              height: '24px',
            }}
          />
          Update Profile
        </button>
        </Link>
        </div>
      </div>
    </div>
  );
};

export default NavigationDropdown;
