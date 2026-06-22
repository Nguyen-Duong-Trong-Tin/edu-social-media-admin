import axios from "axios";

import configs from "@/configs";

const axiosApi = axios.create({
  baseURL: configs.API_BASE_URL,
});

axiosApi.interceptors.request.use(
  function (config) {
    config.headers["accessToken"] = "abc";
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
