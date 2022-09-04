import { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import userService from "../services/UserService";
import "./login.css";

const Login = (props) => {
  const [errMessage, setErrMessage] = useState("");
  const navigate = useNavigate();

  const usernameRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    document.title = "Login";
    localStorage.setItem("user-token", "");
  });

  const handleLogin = (e) => {
    e.preventDefault();
    setErrMessage(
      <div
        className="spinner-border"
        role="status"
        style={{ width: "20px", height: "20px" }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    );
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    userService
      .login(username, password)
      .then((res) => {
        localStorage.setItem("user-token", res.data);
        navigate("/home");
      })
      .catch(() => {
        setErrMessage("Sai tên tài khoản hoặc mật khẩu");
      });
  };

  return (
    <Fragment>
      <div className="container text-center h-100">
        <div className="row align-items-center h-100">
          <div className="col">
            <form
              className="form-login bg-light border border-secondary rounded rounded-3"
              onSubmit={handleLogin}
            >
              <h2 className="mb-5">Đăng nhập</h2>
              <div className="text-danger mb-2 small">{errMessage}</div>

              <div className="form-group mb-2">
                <label htmlFor="username">Tên tài khoản</label>
                <input
                  id="username"
                  type="text"
                  className="form-control mt-2"
                  placeholder="Username"
                  ref={usernameRef}
                />
              </div>

              <div className="form-group mb-2">
                <label htmlFor="password">Mật khẩu</label>
                <input
                  id="password"
                  type="password"
                  className="form-control mt-2"
                  placeholder="Password"
                  ref={passwordRef}
                />
              </div>
              <button type="submit" className="btn btn-primary mt-2">
                Đăng nhập
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
