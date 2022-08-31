import api from "./api";

const list = () => api.get(`${api.url.employee}/list`).then((res) => res);
const assignList = (proId) =>
  api.get(`${api.url.employee}/${proId}/assign`).then((res) => res);

const notAssignList = (proId) =>
  api.get(`${api.url.employee}/${proId}/notAssign`).then((res) => res);

const get = (id) => api.get(`${api.url.employee}/${id}`).then((res) => res);
const add = (data) =>
  api.post(`${api.url.employee}/add`, data).then((res) => res);
const update = (data) =>
  api.put(`${api.url.employee}/update`, data).then((res) => res);
const remove = (id) =>
  api.delete(`${api.url.employee}/delete`).then((res) => res);

const EmpService = {
  list,
  assignList,
  notAssignList,
  get,
  add,
  update,
  delete: remove,
};

export default EmpService;
