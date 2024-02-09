import axios from "axios";
const local_api = "http://localhost:5000/api";
const production_api = "";


const api = axios.create({
    baseURL: local_api,
});

export default api;