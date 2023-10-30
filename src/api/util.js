import axios from "axios";
import { post } from "./api";
import  toast  from "react-hot-toast";

async function postDataChange(isAddLanguage, languageId) {
  const endpoint = isAddLanguage ? "/user/addLanguage" : "/user/resetProgress";
  try {
    const requestBody = {languageId};

    const response =  await post(endpoint, requestBody)

    if(response.acknowledged){
      toast.success("Successfully updated the user settings in database");
      return true;
    }else if(!response.acknowledged){
      toast.error(" Database server didn't acknowledge the update request try again later");
      throw Error("Update request failed");
    }

  } catch (error) {
    console.log("error updating user language settings: " + error.message);
  }
}


export default postDataChange ;