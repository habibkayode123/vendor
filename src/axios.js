import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'production'
        ? '' : 'http://localhost:3050/api/v1'
})

instance.interceptors.request.use(request => {
    return request;
}, errer => {
    return Promise.reject(error);
});

instance.interceptors.response.use(response => {
    console.log(response);
    return response;
}, error => {
    return Promise.reject(error);
})

export default instance;