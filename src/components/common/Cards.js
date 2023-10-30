import React, { useState } from 'react';
import CustomModal from './Modals';
import { Link } from "react-router-dom";
import '../userSetting.css'

function LanguageCard({ data, isAddLanguage = false, setLanguageId,setShowModal,
  setIsAddLanguage, 
  setModalMessage }) {

  const handleButtonClick = () => {

    if (isAddLanguage) {
      setLanguageId(data._id)
      setModalMessage(`Are you sure you want to add ${data.name} in your learning track?`)
      setIsAddLanguage(true)
      setShowModal(true)
    } else {
      setLanguageId(data.language._id)
      setModalMessage(
        `Are you sure you want to reset progress for ${data.language.name} ?`
      );
      setIsAddLanguage(false);
      setShowModal(true)
    }
  };


return (
  <div className="language-card">
     <div className="lcard-content"> 
    <h3>{isAddLanguage ? data.name : (data.language ? data.language.name : '')}</h3>
    {isAddLanguage ? (
      <>
        <p>Total Questions: {data.total_questions}</p>
        <p>Total Score: {data.total_score}</p>
        <p>Exercises: {data.exercises}</p>
        <button onClick={() => handleButtonClick()}>+ Add Language</button> {/* Open the modal when clicked */}
      </>
    ) : (
      <>
        <p>Proficiency: {data.proficiency}</p>
        <p>Score: {data.score}</p>
        <button onClick={() => handleButtonClick()}>Reset Progress</button> {/* Open the modal when clicked */}
      </>
    )}
     </div>

  </div>
);
}

/**
 * LanguageCard is a React component that represents a card displaying information about a language.
 *
 * @param {object} props - The properties for the LanguageCard component.
 * @param {object} props.language - The language information to display on the card.
 * @returns {JSX.Element} The rendered LanguageCard component.
 */
function LanguageCardDashboard({ language: card }) {
  return (
    <div className="col-md-4 mb-4">
      <div
        className="card border border-primary"
        style={{ backgroundColor: "#222", color: "#fff" }}
      >
        <div className="card-body">
          <h5 className="card-title">{card.language.name}</h5>
          <p className="card-text" style={{ color: "#999" }}>
            Proficiency: {card.proficiency}
            <br />
            Score: {card.score}
          </p>
          {/* Wrap the card with Link to navigate to exercise details */}
          <Link to={`/exercises/${card.language._id}`}>
            <button
              className="btn btn-primary btn-block"
              style={{ backgroundColor: "#007bff", color: "#fff" }}
            >
              Explore Excercise
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}



const cardStyles = {
  border: "2px solid #3498db",
  borderRadius: "10px",
  width: "18rem",
  margin: "20px",
  padding: "10px",
  background: "#292b2c",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
  display: "inline-block",
  color: "white",
};

const cardContainerStyles = {
  display: "flex",
  flexDirection: "column",
  height: "100%", // Set a fixed height for the container
};
function ExerciseCard({ exercise, languageId}) {
  return (
    <div className="card" style={cardStyles}>
      <div className="card-body" style={cardContainerStyles}>
        <div className="card-body">
          <h5 className="card-title">{exercise.name}</h5>
          <p className="card-text">
            <strong>Description:</strong>
            <div style={{ maxHeight: '120px', overflow: 'auto' }}>
              {exercise.description}
            </div>
            <br />
            <strong>Questions:</strong> {exercise.Questions}
            <div className="progress">
              <div
                className="progress-bar bg-danger"
                role="progressbar"
                style={{
                  width: `${(exercise.completed / exercise.Questions) * 100}%`,
                }}
                aria-valuenow={(exercise.completed / exercise.Questions) * 100}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {Math.round((exercise.completed / exercise.Questions) * 100)}%
              </div>
            </div>
            {exercise.completed !== exercise.Questions && (
              <div style={{ marginTop: '10px' }}>
                <Link to={`/quiz/${exercise._id}/${languageId}`} className="btn btn-primary">
                  Attend Quiz
                </Link>
              </div>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}


export {LanguageCard , LanguageCardDashboard, ExerciseCard}
