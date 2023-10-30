import React from 'react';
import { LanguageCard }from './common/Cards';

function AddLanguages({ availableLanguages, setLanguageId, setShowModal,
  setIsAddLanguage, 
  setModalMessage }) {
  return (
    <div className='language-progress'>
       <div>
      <h2>Add Languages</h2>
      </div>
      {availableLanguages?.map((languageData, index) => (
        <LanguageCard
          key={index}
          data={languageData}
          isAddLanguage={true}
          setLanguageId = {setLanguageId}
          setShowModal = {setShowModal}
  setIsAddLanguage={setIsAddLanguage} 
  setModalMessage={setModalMessage}
        />
      ))}
    </div>
  );
}

export default AddLanguages;
