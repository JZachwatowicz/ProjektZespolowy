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
const showUsers = () => {
    return axios.get(API_URL + "all/get");
}
const get_all_users = () => {
    return axios.get(API_URL + "all/get");
}
const getUser = (id) => {
    return axios.get(API_URL + "all/get/" + id)
}
const addUser = (data) => {
    return axios.post(API_URL + "add", data, {headers: authHeader()})
}
const editUser = (id, data) => {
    return axios.put(API_URL + "edit/" + id, data, {headers: authHeader()})
}
const editUserAddress = (id, data) => {
    return axios.put(API_URL + "editaddress/" + id, data, {headers: authHeader()})
}
const deleteUser = (id) => {
    return axios.delete(API_URL + "delete/" + id, { headers: authHeader() });
};

const UserService = {
    getPublicContent,
    getUserBoard,
    getEmployeeBoard,
    getAdminBoard,
    get_all_users,
    getUser,
    showUsers,
    editUser,
    editUserAddress,
    addUser,
    deleteUser
}

export default UserService;