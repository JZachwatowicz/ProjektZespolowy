import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:5000/api/address/";

const showAddress = () => {
    return axios.get(API_URL + "get", { headers: authHeader() });
};
const deleteAddress = (id) => {
    return axios.delete(API_URL + "delete/" + id, { headers: authHeader() });
};
const addAddress = (countryName, countryCode, voivodeshipName, cityName, streetName, buildingNumber, apartmentNumber) => {
    return axios.post(API_URL + "add", {
        countryName, countryCode, voivodeshipName, cityName, streetName, buildingNumber, apartmentNumber
    }, { headers: authHeader() });
};
const editAddress = (id, countryName, countryCode, voivodeshipName, cityName, streetName, buildingNumber, apartmentNumber) => {
    return axios.put(API_URL + "edit/" + id, {
        countryName, countryCode, voivodeshipName, cityName, streetName, buildingNumber, apartmentNumber
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
