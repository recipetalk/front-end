import axios from 'axios';
import {loadLoginFromStorage} from '../repository/AutoLogin';
import {jsonLogin} from './JsonLogin';

export const jsonAPI = axios.create({
  baseURL: 'http://kitcapstone.iptime.org:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const multiPartAPI = axios.create({
  baseURL: 'http://kitcapstone.iptime.org:8080',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

jsonAPI.interceptors.response.use(
  res => {
    return res;
  },
  async err => {
    const {
      config,
      response: {status},
    } = err;
    if (status === 401) {
      //console.log('jsonAPI response Interceptor : ', err.response);
      const originalRequest = config;
      const {username, password} = await loadLoginFromStorage();
      config.headers.authorization = await jsonLogin(username, password);
      return axios(originalRequest);
    }
    return Promise.reject(err);
  },
);

multiPartAPI.interceptors.response.use(
  res => {
    return res;
  },
  async err => {
    const {
      config,
      response: {status},
    } = err;
    if (status === 401) {
      console.log('multipart response Interceptor : ', err);
      const originalRequest = config;
      const {username, password} = await loadLoginFromStorage();
      config.headers.authorization = await jsonLogin(username, password);
      return axios(originalRequest);
    }
    return Promise.reject(err);
  },
);

export default {jsonAPI, multiPartAPI};
