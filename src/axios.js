import axios from "axios";
import auth from "./auth/auth-helper";
import { herouke } from "./url";

const instance = axios.create({
<<<<<<< HEAD
  baseURL: process.env.NODE_ENV === "production" ? "" : `${herouke}/api`,
=======
  baseURL: "https://procurementsolution.herokuapp.com/api",
>>>>>>> 833a7f049c50cfc0239725c4646ed587b909a6d0
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
