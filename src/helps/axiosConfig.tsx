import axios from 'axios';
import {jwtManager} from './jwtManager';

export default function axiosConfig() {
  axios.defaults.baseURL =
    'https://laboratory-management-system.onrender.com/apis/';
  axios.interceptors.request.use(
    async config => {
      config.headers['Content-Type'] = 'application/json';
      const token = (await jwtManager).get();
      if (token) {
        config.headers.Authorization = 'Bearer ' + `${token}`;
      }
      return config;
    },
    error => {
      Promise.reject(error);
    },
  );
  axios.interceptors.response.use(
    (response: any) => {
      if (response && response.data) {
        return response.data;
      }
      return response;
    },
    (error: any) => {
      throw error.response.data.message;
    },
  );
}
