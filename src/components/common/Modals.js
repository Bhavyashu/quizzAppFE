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

function NoExercisesModal() {
  return (
    <div className="exer-modal">
      <div className="modal-content">
        <p>
          Our Team is currently working on making exercises for this language.
          Until then, please try another language.
        </p>
      </div>
    </div>
  );
}

export {CustomModal,NoExercisesModal};
