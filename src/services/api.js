import axios from "axios";

const url = {
  baseUrl: "http://localhost:6969/api",
  login: "/login",
  employee: "/employee",
  project: "/project",
};

const instance = axios.create({
  baseURL: url.baseUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
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
