import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:5000/api/activity/";

const showActivities = () => {
    return axios.get(API_URL + "get", { headers: authHeader() });
};
const deleteActivity = (id) => {
    return axios.delete(API_URL + "delete/" + id, { headers: authHeader() });
};
const addActivity = (name, description) => {
    return axios.post(API_URL + "add", {
        name,
        description,
    }, { headers: authHeader() });
};
const editActivity = (id, name, description) => {
    return axios.put(API_URL + "edit/" + id, {
        name: name,
        description: description,
    }, { headers: authHeader() });
};
const getActivity = (id) => {
    return axios.get(API_URL + "get/" + id, { headers: authHeader() });
};

const ActivityService = {
    showActivities,
    addActivity,
    deleteActivity,
    editActivity,
    getActivity
}

export default ActivityService;