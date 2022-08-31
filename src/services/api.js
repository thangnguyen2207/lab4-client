import axios from "axios";

const url = {
  baseUrl: "https://lab4-serverr.herokuapp.com/api",
  // baseURL: "http://localhost:6969/api",
  login: "/login",
  employee: "/employee",
  project: "/project",
};

const instance = axios.create({
  baseURL: url.baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    token: `Bearer ${localStorage.getItem("user-token")}`,
  },
});

const api = {
  url,
  instance,
  get: instance.get,
  post: instance.post,
  put: instance.put,
  delete: instance.delete,
};

export default api;
