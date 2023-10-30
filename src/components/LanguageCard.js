import React, { useState } from 'react';
import CustomModal from './Modal';

import './userSetting.css'

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
  <div className="language-card" style = {{backgroundColor:"white"}}>
     <div className="lcard-content"> 
    <h3>{isAddLanguage ? data.name : (data.language ? data.language.name : '')}</h3>
    {isAddLanguage ? (
      <>
        <p>Total Questions: {data.total_questions}</p>
        <p>Total Score: {data.total_score}</p>
        <p>Exercises: {data.exercises}</p>
        <button class = "btn btn-primary" onClick={() => handleButtonClick()}>+ Add Language</button> {/* Open the modal when clicked */}
      </>
    ) : (
      <>
        <p>Proficiency: {data.proficiency}</p>
        <p>Score: {data.score}</p>
        <button class = "btn btn-primary" onClick={() => handleButtonClick()}>Reset Progress</button> {/* Open the modal when clicked */}
      </>
    )}
     </div>

  </div>
);
// ...

}

export default LanguageCard;
