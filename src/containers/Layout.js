import { Fragment, useCallback, useState } from "react";
import { Navigate, Route, Routes } from "react-router";
import Header from "./Header";
import Home from "../pages/Home";
import EmpList from "../pages/employee/EmpList";
import ProList from "../pages/project/ProList";
import ProDetail from "../pages/project/ProDetail";
import EmpListSearch from "../pages/employee/EmpListSearch";

const Layout = () => {
  const [loading, setLoading] = useState(true);

  const setLoadingState = useCallback(
    (val) => {
      setLoading(val);
    },
    [setLoading]
  );

  return (
    <Fragment>
      <Header />
      <div className="container-fluid">
        <div className="pt-3">
          <Routes>
            <Route
              path="/home"
              element={<Home setLoading={setLoadingState} />}
            />
            <Route
              path="/employee/list"
              element={<EmpList setLoading={setLoadingState} />}
            />
            <Route
              path="/project/list"
              element={<ProList setLoading={setLoadingState} />}
            />
            <Route
              path="/project/detail"
              element={<ProDetail setLoading={setLoadingState} />}
            />
            <Route
              path="/employee/list/search"
              element={<EmpListSearch setLoading={setLoadingState} />}
            />
            <Route path="/*" element={<Navigate to="/error" />} />
          </Routes>
        </div>
      </div>
      <div
        id="loadingScreen"
        className={`position-fixed top-0 bottom-0 start-0 end-0 text-center ${
          loading ? "" : "d-none"
        }`}
        style={{ backgroundColor: "#80808066" }}
      >
        <div
          className="spinner-border text-primary"
          role="status"
          style={{ marginTop: "50vh", width: "3em", height: "3em" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </Fragment>
  );
};

export default Layout;
