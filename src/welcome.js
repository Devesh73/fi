import React from 'react';
import './Welcome.css'; // Import your CSS file

const Welcome = ({ user, handleLogout }) => {
  return (
    <div className="welcome-container">
      <h2 className="welcome-message">
        Welcome to ABC Bank, <span className="user-name">{user.displayName}</span>!
      </h2>
      <div className="action-buttons">
        <button className="custom-button custom-withdraw-button">withdraw</button>
        <button className="custom-button custom-details-button">Check Bank Details</button>
        <button className="custom-button custom-deposit-button">Deposit</button>
      </div>
      <p className="logout-link" onClick={handleLogout}>
        Log Out
      </p>
    </div>
  );
};

export default Welcome;

