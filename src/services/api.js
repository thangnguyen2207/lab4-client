import axios from "axios";

const url = {
  // baseUrl: "https://lab4-serverr.herokuapp.com/api",
  baseUrl: "http://localhost:6969/api",
  login: "/login",
  authorize: "authorize",
  employee: "/employee",
  project: "/project",
  assign: "/assign",
};

const instance = axios.create({
  baseURL: url.baseUrl,
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
