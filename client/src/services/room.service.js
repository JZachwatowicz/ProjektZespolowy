import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:5000/api/room/";
const TYPE_API_URL = "http://localhost:5000/api/room_type/";

const showRooms = () => {
    return axios.get(API_URL + "get", { headers: authHeader() });
};
const deleteRoom = (id) => {
    return axios.delete(API_URL + "delete/" + id, { headers: authHeader() });
};
const addRoom = (name, capacity,department, room_type) => {
    return axios.post(API_URL + "add", {
        name,
        capacity,
        department_id: department,
        room_type_id: room_type
    }, { headers: authHeader() });
};
const editRoom = (id, name, capacity,department, room_type) => {
    return axios.put(API_URL + "edit/" + id, {
        name: name,
        capacity: capacity,
        department_id: department,
        room_type_id: room_type
    }, { headers: authHeader() });
};
const getRoom = (id) => {
    return axios.get(API_URL + "get/" + id, { headers: authHeader() });
};

const getRoomTypes = () => {
    return axios.get(TYPE_API_URL + "get", { headers: authHeader() });
};

const addRoomType = (name) => {
    return axios.post(TYPE_API_URL + "add", {name},{ headers: authHeader() });
};

const editRoomType = (id, name) => {
    return axios.put(TYPE_API_URL+ "edit/" + id, {name},{ headers: authHeader() });
};

const deleteRoomType = (id) => {
    return axios.delete(TYPE_API_URL + "delete/" + id, { headers: authHeader() });
};
const getRoomType = (id) => {
    return axios.get(TYPE_API_URL + "get/id:" + id, { headers: authHeader() });
};

const getDepartments = () => {
    return axios.get(API_URL + "getDepartments", { headers: authHeader() });
};

const RoomService = {
    showRooms,
    addRoom,
    deleteRoom,
    editRoom,
    getRoom,
    getRoomTypes,
    addRoomType,
    editRoomType,
    deleteRoomType,
    getRoomType,
    getDepartments
}

export default RoomService;