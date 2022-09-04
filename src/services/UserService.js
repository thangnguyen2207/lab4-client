import api from "./api";

const login = (username, password) => {
  const data = {
    username: username,
    password: password,
  };

  const res = api.post(api.url.login, data);
  return res;
};

const authorize = (data) =>
  api.post(api.url.authorize, data).then((res) => res);

const userService = {
  login,
  authorize,
};

export default userService;
