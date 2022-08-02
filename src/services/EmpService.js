import api from "./api";

const list = () => api.get(`${api.url.employee}/list`).then((res) => res.data);
const listByProject = (proId) =>
  api.get(`${api.url.employee}/list/search/${proId}`).then((res) => res.data);

const get = (id) =>
  api.get(`${api.url.employee}/${id}`).then((res) => res.data);
const add = (data) =>
  api.post(`${api.url.employee}/add`, data).then((res) => res.data);
const update = (data) =>
  api.put(`${api.url.employee}/update`, data).then((res) => res.data);
const remove = (id) =>
  api.delete(`${api.url.employee}/delete`).then((res) => res.data);

const EmpService = {
  list,
  listByProject,
  get,
  add,
  update,
  delete: remove,
};

export default EmpService;
