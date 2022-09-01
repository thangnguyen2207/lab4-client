import api from "./api";

const list = () => api.get(`${api.url.project}/list`).then((res) => res);

const get = (id) => api.get(`${api.url.project}/${id}`).then((res) => res);
const add = (data) =>
  api.post(`${api.url.project}/add`, data).then((res) => res);
const update = (data) =>
  api.post(`${api.url.project}/update`, data).then((res) => res);
const remove = (id) =>
  api.delete(`${api.url.project}/delete/${id}`).then((res) => res);

const ProService = {
  list,
  get,
  add,
  update,
  delete: remove,
};

export default ProService;
