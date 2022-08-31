import { Fragment, useEffect, useRef, useState } from "react";
import EmpService from "../../services/EmpService";
import ProService from "../../services/ProService";

const ProDetail = (props) => {
  const [pro, setPro] = useState({});
  const [assignEmps, setAssignEmps] = useState([]);
  const [notAssignEmps, setNotAssignEmps] = useState([]);
  const [filterData, setFilterData] = useState(notAssignEmps);
  const searchKey = useRef();

  useEffect(() => {
    document.title = "Project Infomation";
    EmpService.assignList(localStorage.getItem("cur-proId")).then((res) => {
      setAssignEmps(res.data.content);
      EmpService.notAssignList(localStorage.getItem("cur-proId")).then(
        (res) => {
          setNotAssignEmps(res.data.content);
          ProService.get(localStorage.getItem("cur-proId")).then((res) => {
            setPro(res.data.content);
          });
        }
      );
    });
  }, []);

  const handleSearchInput = () => {
    setFilterData(
      notAssignEmps.filter((emp) =>
        `${emp.firstName} ${emp.lastName}`.includes(searchKey.current.value)
      )
    );
    document.getElementById("search-dropdown").classList.add("show");
  };

  const handleSearchEnd = () => {
    setTimeout(function () {
      document.getElementById("search-dropdown").classList.remove("show");
    }, 150);
  };

  const handleSeachItemClick = (id) => {
    const selectedItem = filterData.filter((emp) => emp.employeeId === id)[0];
    setAssignEmps([...assignEmps, selectedItem]);
    setNotAssignEmps([...notAssignEmps].filter((emp) => emp !== selectedItem));
  };

  const handleHoursWorkedChange = (id, value) => {
    const changedIndex = assignEmps.findIndex((emp) => emp.employeeId === id);
    assignEmps[changedIndex].hoursWorked = value;
  };

  return (
    <Fragment>
      <div className="row g-4">
        <div className="col-md-7">
          <div className="card border-secondary">
            <div className="card-header">
              <div className="row">
                <div className="col-md-7">
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fas fa-search"></i>
                    </span>
                    <input
                      ref={searchKey}
                      className="form-control"
                      type="text"
                      placeholder="Assign Employee"
                      onChange={handleSearchInput}
                      onBlur={handleSearchEnd}
                    />
                  </div>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle d-none"
                      type="button"
                      id="searchBtn"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Dropdown button
                    </button>
                    <ul
                      id="search-dropdown"
                      className="dropdown-menu w-100 mt-1"
                      aria-labelledby="searchBtn"
                    >
                      {filterData.map((emp, idx) => (
                        <li key={idx}>
                          <a
                            className="dropdown-item"
                            href="#/"
                            onClick={(e) =>
                              handleSeachItemClick(emp.employeeId)
                            }
                          >{`${emp.firstName} ${emp.lastName}`}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Hours Worked</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {assignEmps.map((emp, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{emp.firstName}</td>
                      <td>{emp.lastName}</td>
                      <td className="w-25">
                        <input
                          type="number"
                          className="form-control w-75"
                          min="0"
                          defaultValue={emp.hoursWorked}
                          onChange={(e) =>
                            handleHoursWorkedChange(
                              emp.employeeId,
                              e.currentTarget.value
                            )
                          }
                        />
                      </td>
                      <td>
                        <i className="fa-solid fa-remove text-danger"></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-md-5">
          <div className="border border-secondary rounded p-3">
            <h4>Project Infomation</h4>
            <hr />
            <table>
              <tbody>
                <tr>
                  <th className="w-50 py-3">Project Name</th>
                  <td>{pro.name}</td>
                </tr>
                <tr>
                  <th className="py-3">Max Hours</th>
                  <td>{pro.maxHours}</td>
                </tr>
                <tr>
                  <th className="py-3">Start Date</th>
                  <td>
                    <input
                      type="date"
                      className="form-control"
                      value={
                        pro.startDate != null
                          ? new Date(pro.startDate).toLocaleDateString("en-CA")
                          : new Date().toLocaleDateString("en-CA")
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <th className="py-3">End Date</th>
                  <td>
                    <input
                      type="date"
                      className="form-control"
                      value={
                        pro.endDate != null
                          ? new Date(pro.endDate).toLocaleDateString("en-CA")
                          : new Date().toLocaleDateString("en-CA")
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <th></th>
                  <td>
                    <button type="button" className="btn btn-danger me-2 my-2">
                      Delete
                    </button>
                    <button type="button" className="btn btn-primary">
                      Save changes
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProDetail;
