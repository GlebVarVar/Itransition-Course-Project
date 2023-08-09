import axios from "axios";
import { _apiBase } from ".";

const getAllUsersAPI = async (email: string) => {
    const response = await axios.get(`${_apiBase}/users/`, {headers: {email: email}});
    return response;
}


interface User {
    username: string;
    email: string;
    password: string;
}

const userRegistraionAPI = async (user: User) => {
    await axios.post(`${_apiBase}/users/registration`, { user })
}

const getUserAPI = async (id: number) => {
    const response = await axios.get(`${_apiBase}/users/${id}`);
    return response
} 

export {getAllUsersAPI, userRegistraionAPI, getUserAPI}