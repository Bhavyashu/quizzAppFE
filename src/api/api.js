import axios from "axios";
import base_url from "../constants";
import toast from "react-hot-toast";

const excludeTokenUrls = ['//user/login']


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
    } else {
      toast.error("GET request failed message:", response.message);
      console.error("GET request failed with status:", response.status);
      return null;
    }
  } catch (error) {
    toast.error("An error occurred during the GET request:", error);
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

    if (response.status === 200 ) { 
      return response.data.data || response.data.status;
    } else {
      toast.error("POST request failed message:", response.message);
      console.log("POST request failed details:", response);
      return null;
    }
  } catch (error) {
    toast.error("An error occurred during the POST request:", error.message);
    console.error("An error occurred during the POST request:", error);
    throw error;
  }
}

export { get, post };
