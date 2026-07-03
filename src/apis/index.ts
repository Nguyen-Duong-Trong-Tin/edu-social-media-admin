import axios from "axios";

import configs from "@/configs";

const axiosApi = axios.create({
  baseURL: configs.API_BASE_URL,
});

import { getCookie } from "@/utils/cookie";

axiosApi.interceptors.request.use(
  function (config) {
    const token = getCookie("accessToken");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosApi.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosApi;
