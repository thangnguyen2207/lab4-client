import api from "./api";

const login = (username, password) => {
  const data = {
    username: username,
    password: password,
  };

  const res = api.post(api.url.login, data);
  return res;
};

const userService = {
  login,
};

export default userService;
