import axios from 'axios';

const Api = axios.create({
    baseURL: "http://localhost:50482/api"
});

export default Api;
