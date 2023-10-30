import axios from "axios";
import { post } from "./api";
import  toast  from "react-hot-toast";

async function postDataChange(isAddLanguage, languageId) {
  const endpoint = isAddLanguage ? "/user/addLanguage" : "/user/resetProgress";
//   toast.error(`this is the endpoint ${endpoint}`)
  try {
    const requestBody = {languageId}
    toast.success(`this is the request body ${requestBody}`);

    const response =  await post(endpoint, requestBody)
    console.log("response recieved from the backend", response);

  } catch (error) {
    console.log("error updating user language settings: " + error.message);
  }
}


export default postDataChange ;