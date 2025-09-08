import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8085/api/employees", // note 8085 here
});

export default api;
