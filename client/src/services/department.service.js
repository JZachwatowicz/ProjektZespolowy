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
const addDepartment = async (name, description, apartment_number,  building_number, street_name, city_name ,voivodeship_name, country_name, country_code) => {
    const address = await axios.post(ADD_API_URL + "add", {
        building_number,
        apartment_number,
        street_name,
        city_name,
        voivodeship_name,
        country_name,
        country_code
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
const editDepartment = async (id, data, address) => {
    const department = await axios.put(DEP_API_URL + "edit/" + id, data, { headers: authHeader() });
    const department_id = department.data.id;
    const address_id = address[0].id;
    return axios.put(DEP_API_URL + "AddressToDepartment/"+ id, {
        department_id,
        address_id
    }, { headers: authHeader() });
};
const getDepartmentAddressId = (id) => {

    return axios.get(DEP_API_URL + "AddressToDepartment/get/"+ id, { headers: authHeader() });
};
const getDepartment = (id) => {
    return axios.get(DEP_API_URL + "get/" + id, { headers: authHeader() });
};

const DepartmentService = {
    showDepartments,
    addDepartment,
    deleteDepartment,
    editDepartment,
    getDepartment,
    getDepartmentAddressId
}

export default DepartmentService;