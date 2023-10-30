import axios from "axios";
import base_url from "../constants";
import toast from "react-hot-toast";

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
      return response.data;
    } else {
      toast.error("GET request failed with status:", response.status);
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
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(`${base_url}${endpoint}`, data, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(JSON.stringify(response,null,2));
    if (response.status === 200) { 
      return response.data;
    } else {
      console.error("POST request failed with status:", response.status);
      return null;
    }
  } catch (error) {
    console.error("An error occurred during the POST request:", error);
    throw error;
  }
}

export { get, post };
