import { Fragment } from "react";
import { Navigate, Route, Routes } from "react-router";
import Header from "./Header";
import Home from "../pages/Home";
import EmpList from "../pages/employee/EmpList";
import ProList from "../pages/project/ProList";
import ProDetail from "../pages/project/ProDetail";
import EmpListSearch from "../pages/employee/EmpListSearch";

const Layout = () => {
  return (
    <Fragment>
      <Header />
      <div className="container-fluid">
        <div className="pt-3">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/employee/list" element={<EmpList />} />
            <Route path="/project/list" element={<ProList />} />
            <Route path="/project/detail" element={<ProDetail />} />
            <Route path="/employee/list/search" element={<EmpListSearch />} />
            <Route path="/*" element={<Navigate to="/error" />} />
          </Routes>
        </div>
      </div>
    </Fragment>
  );
};

export default Layout;
