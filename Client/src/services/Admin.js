import axios from "axios";
import { _apiBase } from ".";









const putAdminAPI = async (email) => {
    await axios.put(`http://localhost:3001/api/users/admin/${email}`);
}

const getIsUserAdminAPI = async (email) => {
    const response = await axios.get("http://localhost:3001/api/users/admin", {headers: {email: email}})
    return response
}



export {putAdminAPI, getIsUserAdminAPI}