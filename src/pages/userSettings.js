import React, { useState, useEffect } from 'react';
import LanguageProgress from '../components/LanguageProgress';
import AddLanguages from '../components/AddLanguages';
import { get, post } from '../api/api';
import changeSettings from '../api/util';
import toast from 'react-hot-toast';
import Dashboard from './Dashboard';
import CustomModal from '../components/Modal';
import { faL } from '@fortawesome/free-solid-svg-icons';

function UserSettings() {
  const [userData, setUserData] = useState(false);
  const [showModal, setShowModal] = useState(false); // New state for modal
  const [modalMessage, setModalMessage] = useState('');
  const[isAddLanguage,setIsAddLanguage] = useState(false);
  const[languageId, setLanguageId] = useState(null);


//   const modalHandler = (isAddLanguage, languageId, languageName) => {
//     setShowModal(true);
//     if (isAddLanguage) {
//       setIsAddLanguage(true);
//       setModalMessage(
//         `Are you sure you want to add ${languageName} in your learning track?`
//       );
//       setLanguageId(languageId);
//     } else {
//       setIsAddLanguage(false);
//       setModalMessage(
//         `Are you sure you want to reset progress for ${languageName} ?`
//       );
//       setLanguageId(languageId);
//     }
//   };


  const handleConfirmAction = async() => {

    const response = await changeSettings(isAddLanguage, languageId);
    console.log(response);
    setShowModal(false);
    // toast.success(`language Id ${languageId}, is add language : ${isAddLanguage}`);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const getLangData = async () => {
    try{
        const response = await get('/user/getlanguages');
        console.log("RESPONSE RECEIVED", response);
        // console.log(`this is the data ${response}`);
        return response;

    }catch(error){
        toast.error('error occured fetching user data');
        console.log(error);
    }
  };

  
  useEffect(() => {
    
    getLangData()
      .then((data) => {                               
        console.log(    `this is the data in uf ${data.preffered_languge}`);
        setUserData(data);
      })
      .catch((error) => {
        console.error('Error fetching user data', error);
      });
  }, []);



  const handleResetProgress = (languageId) => {
    console.log("resetting progress event triggered for language " + languageId);
  };


  const handleAddLanguage = (languageId) => {
    console.log("addd language event triggered for language " + languageId);
  };

  return (
    <div>
      <h1>User Settings</h1>
      {userData && (
          <>
          <LanguageProgress
            progressData={userData?.preffered_languge}
            setLanguageId = {setLanguageId}
            setIsAddLanguage = {setIsAddLanguage}
            setModalMessage = {setModalMessage}
            setShowModal = {setShowModal}

            
          />
          {userData.allLanguages.length!=0?(<AddLanguages
            availableLanguages={userData?.allLanguages}
            setLanguageId = {setLanguageId}
            setIsAddLanguage = {setIsAddLanguage}
            setShowModal = {setShowModal}
            setModalMessage = {setModalMessage}
            flag = {true}
          />):
          (<div className='language-progress' style = {{backgroundColor:"#162A72"}}><h2 style = {{color:"white"}}>Add Languages</h2><br/><div  style = {{ display:"flex", justifyContent:'center', textAlign:"center", color:"white" }}>You have no more languages left to add!</div></div>)
          }
        </>
      )}
      <CustomModal
        isOpen={showModal}
        onClose={handleModalClose}
        onConfirm={handleConfirmAction}
        message={modalMessage}
      />
    </div>
  );
}

export default UserSettings;
