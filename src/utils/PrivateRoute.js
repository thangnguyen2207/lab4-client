import { Navigate, Outlet } from "react-router";

const PrivateRoute = (props) => {
  const access = JSON.parse(sessionStorage.getItem("access"));
  return access ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
