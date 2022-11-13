import axios from "axios";
import authHeader from "./authHeader";
const API_URL = "http://localhost:5000/api/article/";

const get_home_articles = () => {
    return axios.get(API_URL);
}

const post_article = (data) => {
    return axios.post(API_URL + "add", data, { headers: authHeader() });
}

const get_all_articles = () => {
    return axios.get(API_URL + "get");
}

const get_one_article = (id) => {
    return axios.get(API_URL + "get/" + id)
}

const update_article = (id, data) => {
    return axios.put(API_URL + "edit/" + id, data, { headers: authHeader() });
}

const delete_article = (id) => {
    return axios.put(API_URL + "delete/" + id, { headers: authHeader() });
}
/*
const get_user_articles = (author) => {
    return axios.get(API_URL + "get?author=" + author, { headers: authHeader() });
}*/

const ArticleService = {
    get_home_articles,
    post_article,
    get_all_articles,
    get_one_article,
    update_article,
    delete_article,
    //get_user_articles
}

export default ArticleService;