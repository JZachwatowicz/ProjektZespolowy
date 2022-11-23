import axios from "axios";
import authHeader from "./auth-header";
const DEP_API_URL = "http://localhost:5000/api/department/";
const ADD_API_URL = "http://localhost:5000/api/address/";

const showDepartments = () => {
    return axios.get(DEP_API_URL + "get", { headers: authHeader() });
};
const deleteDepartment = (id) => {
    return axios.delete(DEP_API_URL + "delete/" + id, { headers: authHeader() });
};
const addDepartment = async (name, description, apartmentNumber,  buildingNumber, streetName, cityName ,voivodeshipName, countryName, countryCode) => {
    const address = await axios.post(ADD_API_URL + "add", {
        buildingNumber,
        apartmentNumber,
        streetName,
        cityName,
        voivodeshipName,
        countryName,
        countryCode
    }, { headers: authHeader() });

    const department = await axios.post(DEP_API_URL + "add", {
        name,
        description
    }, { headers: authHeader() });

    const department_id = department.data.id;
    console.log(address.data[0]);
    const address_id = address.data[0].id;    

    axios.post(DEP_API_URL + "AddressToDepartment", {
        department_id,
        address_id
    }, { headers: authHeader() });
};
const editDepartment = (id, name, description,  buildingNumber, apartmentNumber, streetName, cityName ,voivodeshipName, countryName, countryCode) => {
    return axios.put(DEP_API_URL + "edit/" + id, {
        name: name,
        description: description,
        
    }, { headers: authHeader() });
};
const getDepartment = (id) => {
    return axios.get(DEP_API_URL + "get/" + id, { headers: authHeader() });
};

const DepartmentService = {
    showDepartments,
    addDepartment,
    deleteDepartment,
    editDepartment,
    getDepartment
}

export default DepartmentService;