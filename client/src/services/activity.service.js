import axios from "axios";
const API_URL = "http://localhost:5000/api/activities/";

const showActivities = () => {
    return axios.get(API_URL + "allActivities");
};
const deleteActivity = (id) => {
    return axios.delete(API_URL + "deleteActivity", { data:{id: id} });
};
const addActivity = (name, description) => {
    return axios.post(API_URL + "addActivity", {
      name,
      description,
    });
};
const editActivity = (id,name, description) => {
    return axios.put(API_URL + "editActivity", {
        id: id,
        name: name,
        description: description,
    });
};
const getActivity = (id) => {
    return axios.get(API_URL + "getActivity/"+id);
};

const ActivityService = {
    showActivities,
    addActivity,
    deleteActivity,
    editActivity,
    getActivity
}

export default ActivityService;