import axios from "axios";
import { _apiBase } from ".";




const postCreatePostAPI = async (title, postText, email, category ) => {
    const responce = await axios.post(`${_apiBase}/posts`, {title, postText, email, category });
    return responce;
}


const deleteUserPostsAPI = async (email) => {
    await axios.delete(`${_apiBase}/posts/${email}`);
}

const deleteUserPostAPI = async (id) => {
    await axios.delete(`${_apiBase}/posts/${id}`);
}

const getPostsAPI = async (count, filter) => {
    const response = await axios.get(`${_apiBase}/posts`, {headers: {countOfDisplay : count, filter: filter}});
    return response
}

const getPostAPI = async (id) => {
    const response = await axios.get(`${_apiBase}/posts/${id}`);
    return response
}






export {postCreatePostAPI, deleteUserPostsAPI, getPostsAPI, getPostAPI, deleteUserPostAPI}