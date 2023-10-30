import React from 'react';
import LanguageCard from './LanguageCard';

function LanguageProgress({ progressData ,setLanguageId, setShowModal,
  setIsAddLanguage, 
  setModalMessage
}) {
  return (
    <div className="language-progress"> 
   <div>
      <h2>Languages Progress</h2>
      </div>
      {progressData?.map((languageData, index) => (
        <LanguageCard
          key={index}
          data={languageData}
          isAddLanguage={false}
          setLanguageId = {setLanguageId}
          setShowModal = {setShowModal}
          setIsAddLanguage = {setIsAddLanguage}
          setModalMessage = {setModalMessage}
        />
      ))}
    </div>
  );
}

export default LanguageProgress;
