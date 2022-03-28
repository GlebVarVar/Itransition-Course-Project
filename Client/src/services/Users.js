import axios from "axios";
import { _apiBase } from ".";

const getAllUsersAPI = async (email) => {
    const response = await axios.get("http://localhost:3001/api/users/", {headers: {email: email}});
    return response;
}

const postRegistraionAPI = async (email, username) => {
    await axios.post("http://localhost:3001/api/users/registration", {email, username })
}

const getUserAPI = async (id) => {
    const response = await axios.get(`${_apiBase}/users/${id}`);
    return response
} 

export {getAllUsersAPI, postRegistraionAPI, getUserAPI}