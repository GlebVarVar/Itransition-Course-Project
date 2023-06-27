import axios from "axios";
import { _apiBase } from ".";









const putAdminAPI = async (email) => {
    await axios.put(`${_apiBase}/users/admin/${email}`);
}

const getIsUserAdminAPI = async (email) => {
    const response = await axios.get(`${_apiBase}/users/admin`, {headers: {email: email}})
    return response
}



export {putAdminAPI, getIsUserAdminAPI}