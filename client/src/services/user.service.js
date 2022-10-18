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

const UserService = {
    getPublicContent,
    getUserBoard,
    getEmployeeBoard,
    getAdminBoard,
}

export default UserService;