import axios from "axios";
import authHeader from "./auth-header";
const ITEM_API_URL = "http://localhost:5000/api/item/";
const TYPE_API_URL = "http://localhost:5000/api/item_type/";

const showItems = () => {
    return axios.get(ITEM_API_URL + "get", { headers: authHeader() });
};
const deleteItem = (id) => {
    return axios.delete(ITEM_API_URL + "delete/" + id, { headers: authHeader() });
};
const addItem = (name, serial_number, possesion_date, item_type) => {
    return axios.post(ITEM_API_URL + "add", {
        name,
        serial_number,
        possesion_date,
        item_type
    }, { headers: authHeader() });
};
const editItem = (id, name, serial_number,possesion_date, item_type ) => {
    return axios.put(ITEM_API_URL + "edit/" + id, {
        name,
        serial_number,
        possesion_date,
        item_type
    }, { headers: authHeader() });
};
const getItem = (id) => {
    return axios.get(ITEM_API_URL + "get/" + id, { headers: authHeader() });
};

const getItemTypes = () => {
    return axios.get(TYPE_API_URL + "get", { headers: authHeader() });
};

const addItemType = (name) => {
    return axios.post(TYPE_API_URL + "add", {name},{ headers: authHeader() });
};

const editItemType = (id, name) => {
    return axios.put(TYPE_API_URL+ "edit/" + id, {name},{ headers: authHeader() });
};

const deleteItemType = (id) => {
    return axios.delete(TYPE_API_URL + "delete/" + id, { headers: authHeader() });
};
const getItemType = (id) => {
    return axios.get(ITEM_API_URL + "get/id:" + id, { headers: authHeader() });
};

const ItemService = {
    showItems,
    deleteItem,
    addItem,
    editItem,
    getItem,
    getItemTypes,
    addItemType,
    editItemType,
    deleteItemType,
    getItemType
}

export default ItemService;