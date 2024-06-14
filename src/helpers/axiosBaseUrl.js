import axios  from "axios";

const baseURL = 'http://localhost:8080/bands/';

const baseRequest = axios.create({
  baseURL: baseURL,
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
  }
});

export default baseRequest;