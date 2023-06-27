import axios from "axios";
import { _apiBase } from ".";

const postRatingAPI = async (id, email, count) => {
    const response = await axios.post(`${_apiBase}/rating/${id}`,{PostId: id, email: email, Rating: count});
    return response
}

const getRatingAPI = async (email, postId) => {
    const response = await axios.get(`${_apiBase}/rating/${postId}`,{headers: {email: email}});
    return response
}

export {postRatingAPI, getRatingAPI}