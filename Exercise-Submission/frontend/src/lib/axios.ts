import Axios from "axios";

export const axios = Axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
});

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const message = error.response?.data?.message || error.message;
    console.error(message);
    return Promise.reject(error);
  },
);
