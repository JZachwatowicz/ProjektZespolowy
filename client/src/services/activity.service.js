import axios from "axios";
const API_URL = "http://localhost:5000/api/activities/";

const showActivities = () => {
    return axios.get(API_URL + "allActivities");
};
const deleteActivity = (id) => {
    return axios.delete(API_URL + "deleteActivity", { id });
};
const addActivity = (name, description) => {
    return axios.post(API_URL + "addActivity", {
      name,
      description,
    });
};

const ActivityService = {
    showActivities,
    addActivity,
    deleteActivity
}

export default ActivityService;