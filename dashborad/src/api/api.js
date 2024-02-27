import axios from "axios";
// const local_api = "https://ecom-backend-iuv5.onrender.com/api";
const local_api = "http://localhost:5000/api";

const token = localStorage.getItem("accessToken");

const api = axios.create({
    baseURL: local_api,
    headers: {
        Authorization: token ? `Bearer ${token}` : "",
    },
    withCredentials: true,
});

export default api;

