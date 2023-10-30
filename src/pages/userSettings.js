import React, { useState, useEffect } from 'react';
import LanguageProgress from '../components/LanguageProgress';
import AddLanguages from '../components/AddLanguages';
import { get, post } from '../api/api';
import changeSettings from '../api/util';
import toast from 'react-hot-toast';
import Dashboard from './Dashboard';
import { CustomModal}  from '../components/common/Modals';
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
          <AddLanguages
            availableLanguages={userData?.allLanguages}
            setLanguageId = {setLanguageId}
            setIsAddLanguage = {setIsAddLanguage}
            setShowModal = {setShowModal}
            setModalMessage = {setModalMessage}
          />
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
