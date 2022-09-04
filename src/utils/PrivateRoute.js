import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import userService from "../services/UserService";

const PrivateRoute = (props) => {
  const [authorized, setAuthorized] = useState(null);

  const isAuthoried = () => {
    const token = localStorage.getItem("user-token");

    userService
      .authorize({ token: token })
      .then((res) => {
        setAuthorized(true);
      })
      .catch((error) => {
        setAuthorized(false);
      });
  };

  useEffect(() => {
    isAuthoried();
  }, [authorized]);

  return authorized !== null ? (
    authorized ? (
      <Outlet />
    ) : (
      <Navigate to="/login" />
    )
  ) : null;
};

export default PrivateRoute;
