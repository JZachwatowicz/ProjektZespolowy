import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:5000/api/address/";

const showAddress = () => {
    return axios.get(API_URL + "get", { headers: authHeader() });
};
const deleteAddress = (id) => {
    return axios.delete(API_URL + "delete/" + id, { headers: authHeader() });
};
const addAddress = (data) => {
    return axios.post(API_URL + "add", data, { headers: authHeader() });
};
const editAddress = (id, country_name, country_code, voivodeship_name, city_name, street_name, building_number, apartment_number) => {
    return axios.put(API_URL + "edit/" + id, {
        country_name, country_code, voivodeship_name, city_name, street_name, building_number, apartment_number
    }, { headers: authHeader() });
};
const getAddress = (id) => {
    return axios.get(API_URL + "get/" + id, { headers: authHeader() });
};

const ActivityService = {
    showAddress,
    addAddress,
    deleteAddress,
    editAddress,
    getAddress
}

export default ActivityService;
