import axios from "axios";



const _apiBase = 'http://localhost:3001/api';



const createPostApi = async (title, postText, email, category ) => {
    const responce = await axios.post(`${_apiBase}/posts`, {title, postText, email, category });
    return responce;
}


const getAllTags = async () => {
    const responce = await axios.get(`http://localhost:3001/api/tags`);
    console.log(responce);
    return responce;
}

export {createPostApi, getAllTags}