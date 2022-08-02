import api from "./api";

const list = () => api.get(`${api.url.project}/list`).then((res) => res.data);

const get = (id) => api.get(`${api.url.project}/${id}`).then((res) => res.data);
const add = (data) =>
  api.post(`${api.url.project}/add`).then((res) => res.data);
const update = (data) =>
  api.put(`${api.url.project}/update`).then((res) => res.data);
const remove = (id) =>
  api.delete(`${api.url.project}/delete`).then((res) => res.data);

const ProService = {
  list,
  get,
  add,
  update,
  delete: remove,
};

export default ProService;
