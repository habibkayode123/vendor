import axios from 'axios';
import auth from './auth/auth-helper'

const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'production'
        ? '' : 'http://localhost:3050/api'
})

instance.interceptors.request.use(request => {
    return request;
}, error => {
    return Promise.reject(error);
});

instance.interceptors.response.use(response => {
    
    return response;
}, error => {
    return Promise.reject(error);
})

export default instance;