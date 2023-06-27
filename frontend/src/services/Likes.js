import axios from "axios";
import { _apiBase } from ".";

const getLikesOnPostAPI = async (id, email) => {
    const response = await axios.post(`${_apiBase}/likes`,{PostId: id, email: email});
    return response
}

export {getLikesOnPostAPI}