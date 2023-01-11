import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:5000/api/description/";


const post_description = (data) => {
    return axios.post(API_URL + "add", data, { headers: authHeader() });
}
const get_all_descriptions = () => {
    return axios.get(API_URL + "get", { headers: authHeader() });
}
const get_user_descriptions = (userid) => {
    return axios.get(API_URL + "get/user/" + userid, { headers: authHeader() });
}
const get_one_description = (id) => {
    return axios.get(API_URL + "get/" + id)
}
const delete_description = (id) => {
    return axios.delete(API_URL + "delete/" + id, { headers: authHeader() });
}



const ArticleService = {
    post_description,
    get_all_descriptions,
    get_user_descriptions,
    get_one_description,
    delete_description
}

export default ArticleService;