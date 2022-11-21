import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:5000/api/test/";

const getPublicContent = () => {
    return axios.get(API_URL + "all");
};

const getUserBoard = () => {
    return axios.get(API_URL + "user", { headers: authHeader() });
};

const getEmployeeBoard = () => {
    return axios.get(API_URL + "employee", { headers: authHeader() });
};

const getAdminBoard = () => {
    return axios.get(API_URL + "admin", { headers: authHeader() });
};

const get_all_users = () => {
    return axios.get(API_URL + "all/get");
}

const get_one_user = (id) => {
    return axios.get(API_URL + "all/get/" + id)
}


const UserService = {
    getPublicContent,
    getUserBoard,
    getEmployeeBoard,
    getAdminBoard,
    get_all_users,
    get_one_user
}

export default UserService;