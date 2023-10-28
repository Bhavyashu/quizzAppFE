import React from 'react';
import logoutImage from "../../images/logout.png";
import userProfileImage from "../../images/userProfile.png";
import updateProfileImage from "../../images/settings.png";


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
          color: '#12486B',
        }}
      >
        More options
      </button>
      <div className="dropdown-menu" style={{ width: '250px', top: '100%', left: '-100px' }}>
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
            src={userProfileImage}
            alt="profile.svg"
            style={{
              marginRight: '10px',
              width: '24px',
              height: '24px',
            }}
          />
          Profile
        </button>
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
      </div>
    </div>
  );
};

export default NavigationDropdown;