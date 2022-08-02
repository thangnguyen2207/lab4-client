import api from "./api";

const login = async (username, password) => {
  const data = {
    username: username,
    password: password,
  };

  const res = await api.post(api.url.login, data);
  return res.data;
};

const findUser = (username) =>
  api.post(`${api.url.baseUrl}/user/${username}`).then((res) => res.data);

const userService = {
  login,
  findUser,
};

export default userService;
