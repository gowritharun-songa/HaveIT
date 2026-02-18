
import axios from 'axios';

const api = axios.create({
    baseURL: "https://have-it.onrender.com/api"
});

export default api;