import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

const createAxios = axios.create({
  baseURL: `${baseUrl}/api/`,
  headers: {
    "Content-Type": "application/json"
  }
});

export default createAxios;
