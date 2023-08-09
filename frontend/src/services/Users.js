import axios from "axios";
import { _apiBase } from ".";

const getAllUsersAPI = async (email) => {
    const response = await axios.get(`${_apiBase}/users/`, {headers: {email: email}});
    return response;
}

const userRegistraionAPI = async (email, username) => {
    await axios.post(`${_apiBase}/users/registration`, {email, username })
}

const getUserAPI = async (id) => {
    const response = await axios.get(`${_apiBase}/users/${id}`);
    return response
} 

export {getAllUsersAPI, userRegistraionAPI, getUserAPI}