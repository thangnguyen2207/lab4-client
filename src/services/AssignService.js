import api from "./api";

const assign = (id, data) =>
  api.post(`${api.url.assign}/${id}`, data).then((res) => res);

const AssignService = {
  assign,
};

export default AssignService;
