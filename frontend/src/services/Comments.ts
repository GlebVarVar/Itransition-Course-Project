import axios from "axios";
import { _apiBase } from ".";

const getAllCommentsAPI = async (id) => {
    const response = await axios.get(`${_apiBase}/comments/${id}`);
    return response
}

const postAddCommentAPI = async (Comment, id, email) => {
    const response = await axios.post(`${_apiBase}/comments/`,
    {
        commentBody: Comment, 
        PostId: id,
        email: email
    } 
    );
    return response
}

const deleteCommentAPI = async (id) => {
    const response = await axios.delete(`${_apiBase}/comments/${id}`);
    return response
}

export {getAllCommentsAPI, postAddCommentAPI, deleteCommentAPI}