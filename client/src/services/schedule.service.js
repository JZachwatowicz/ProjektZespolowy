import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:5000/api/schedule/";

const showSchedules = () => {
    return axios.get(API_URL + "get", { headers: authHeader() });
};
const deleteSchedule = (id) => {
    return axios.delete(API_URL + "delete/" + id, { headers: authHeader() });
};
const addSchedule = (data) => {
    return axios.post(API_URL + "add", data, { headers: authHeader() });
};

const addUserSchedule = (id, data) => {
    return axios.put(API_URL + "addUserSchedule/" + id, data, { headers: authHeader() });
};

const getScheduleUsers = (id) => {
    return axios.get(API_URL + "getScheduleUsers/" + id, {headers: authHeader()});
}

const deleteScheduleUser = (s_id, user_id) => {
    return axios.delete(API_URL + "deleteScheduleUser/" + s_id + "/" + user_id, {headers: authHeader()});
}

const editSchedule = (id, data) => {
    return axios.put(API_URL + "edit/" + id, data, { headers: authHeader() });
};
const getSchedule = (id) => {
    return axios.get(API_URL + "get/" + id, { headers: authHeader() });
};

const ScheduleService = {
    showSchedules,
    deleteSchedule,
    addSchedule,
    editSchedule,
    getSchedule,
    addUserSchedule,
    getScheduleUsers,
    deleteScheduleUser
}

export default ScheduleService;