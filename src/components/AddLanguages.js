import React from 'react';
import LanguageCard from './LanguageCard';
import {useState,useEffect} from 'react';

function AddLanguages({ availableLanguages, setLanguageId, setShowModal,
  setIsAddLanguage, 
  setModalMessage, flag }) {

    const [avail,setAvail] = useState(false);

    useEffect(()=>{
      if(availableLanguages.length!=0){
        setAvail(true);
      }
      else{
        setAvail(false);
      }
    },[])
  return (
    <div className='language-progress' style = {{backgroundColor:"#162A72"}}>
       <div>
      <h2 style={{color:"white"}}>Add Languages</h2>
      </div>
      {flag?(availableLanguages?.map((languageData, index) => (
        <LanguageCard
          key={index}
          data={languageData}
          isAddLanguage={true}
          setLanguageId = {setLanguageId}
          setShowModal = {setShowModal}
  setIsAddLanguage={setIsAddLanguage} 
  setModalMessage={setModalMessage}
        />
      ))):(<div style = {{textAlign:'center'}}>You have selected all languages!</div>)}

    </div>
  );
}

export default AddLanguages;
