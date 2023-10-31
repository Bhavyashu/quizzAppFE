import axios from "axios";
import base_url from "../constants";
import toast from "react-hot-toast";
import { errors } from '../utils/errors';
async function get(endpoint) {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(`${base_url}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data.data;
    }
    else {
      toast.error("GET request failed message:", response.message);
      console.error("GET request failed with status:", response.status);
      return null;
    }
  } catch (error) {
    const { data } = error.response;
    if(data.statusCode>=400 && data.statusCode<=409){
      toast.error('Bad request message : ', data.message);
    }
    console.error("An error occurred during the GET request:", error);
    throw error;
  }
}

async function post(endpoint, data) {
  const token = localStorage.getItem("token") ;

  try {
    const response = await axios.post(`${base_url}${endpoint}`, data, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log(`response.data is this ${response.data}`);
    if (response.status === 200 || response.status) { 
      return response.data.data || response.data.status;
    }
    else if(response.status >= 400 && response.status <=409){
      toast.error("Bad Request here is the server response", response.data.message);
      console.error("GET request failed with status:", response.data.message);
      return;
    } else {
      toast.error("POST request failed message:", response.message);
      console.log("POST request failed details:", response);
      return null;
    }
  } catch (error) {
    const { data } = error.response;

    if(data.statusCode>=400 && data.statusCode<=409){
      const errorMessage = `Bad request:  ${data.message}`;
      toast.error(errorMessage);
      console.log("this is the data",data.message);
    }else{
    console.error("An error occurred during the POST request:", error);
    }
    throw error;
  }
}

export { get, post };
