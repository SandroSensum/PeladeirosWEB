import axios from 'axios';

const Api = axios.create({
    baseURL: "http://localhost:50482/api",
    
});

Api.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    var response =
    {
        error,
    }
    
    return response.error.response;
});


export default Api;
