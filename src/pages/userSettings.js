import React, { useState, useEffect } from 'react';
import LanguageProgress from '../components/LanguageProgress';
import AddLanguages from '../components/AddLanguages';
import { get, post } from '../api/api';
import postDataChange from '../api/util';
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


  const handleConfirmAction = async() => {
    setShowModal(false);
    await postDataChange(isAddLanguage, languageId);
    window.location.reload();
  }


  const handleModalClose = () => {
    setShowModal(false);
  };

  const getLangData = async () => {
    try {
      const data = await get('/user/getlanguages');
       setUserData(data);
    } catch (error) {
      toast.error('Error occurred fetching user data');
      console.error(error);
      throw error; // re throw for the use Effect block
    }
  };
  
  useEffect(() => {
    getLangData()
  }, []);
  



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

export default UserSettings
