import React from 'react';

function CustomModal({ isOpen, onClose, onConfirm, message }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="cust-modal">
      <div className="cust-modal-content">
        <p>{message}</p>
        <button className="yes-button" onClick={onConfirm}>Yes</button>
        <button  className="no-button" onClick={onClose}>No</button>
      </div>
    </div>
  );
}

export default CustomModal;
