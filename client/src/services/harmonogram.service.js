import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:5000/api/harmonogram/";

const showHarmonograms = () => {
    return axios.get(API_URL + "get", { headers: authHeader() });
};
const deleteHarmonogram = (id) => {
    return axios.delete(API_URL + "delete/" + id, { headers: authHeader() });
};
const addHarmonogram = (data) => {
    return axios.post(API_URL + "add", data , { headers: authHeader() });
};
const editHarmonogram = (id, data) => {
    return axios.put(API_URL + "edit/" + id, data, { headers: authHeader() });
};
const getHarmonogram = (id) => {
    return axios.get(API_URL + "get/" + id, { headers: authHeader() });
};

const ScheduleService = {
    showHarmonograms,
    deleteHarmonogram,
    addHarmonogram,
    editHarmonogram,
    getHarmonogram
}

export default ScheduleService;