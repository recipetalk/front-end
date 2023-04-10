import axios from 'axios';

export const jsonAPI = axios.create({
  baseURL: 'http://kitcapstone.iptime.org:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

const multiPartAPI = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export default {jsonAPI, multiPartAPI};
