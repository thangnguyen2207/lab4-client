import { Fragment } from "react";

const Header = (props) => {
  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/home">
            Spring Sample
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#headerNavbar"
            title="navbarBtn"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="headerNavbar">
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="/project/list">
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/project/list">
                  Project List
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/employee/list">
                  Employee List
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/employee/list/search">
                  Employee List (Search)
                </a>
              </li>
            </ul>
            <div className="ms-auto text-end">
              <a className="text-white" href="/logout">
                Log out
              </a>
            </div>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
