import axios from "axios";
import auth from "./auth/auth-helper";
import { herouke } from "./url";

const instance = axios.create({
  baseURL: "https://procurementsolution.herokuapp.com/api",
});

instance.interceptors.request.use(
  (request) => {
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
