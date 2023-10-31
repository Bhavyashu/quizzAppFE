import React from 'react';
import {LanguageCard} from './common/Cards';

function LanguageProgress({ progressData ,setLanguageId, setShowModal,
  setIsAddLanguage, 
  setModalMessage
}) {
  return (
    <div className="language-progress" style = {{backgroundColor:"#162A72"}}> 
   <div>
      <h2 style={{color:"white"}}>Languages Progress</h2>
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
