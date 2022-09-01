import { Fragment, useEffect, useRef, useState } from "react";
import EmpService from "../../services/EmpService";
import ProService from "../../services/ProService";
import * as Yup from "yup";
import { useFormik } from "formik";
import TableField from "../../components/TableField";
import { useNavigate } from "react-router";
import AssignService from "../../services/AssignService";

const ProDetail = (props) => {
  const [pro, setPro] = useState({});
  const [assignEmps, setAssignEmps] = useState([]);
  const [notAssignEmps, setNotAssignEmps] = useState([]);
  const [filterData, setFilterData] = useState(notAssignEmps);
  const searchKey = useRef();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      projectId: pro.projectId,
      name: pro.name,
      maxHours: pro.maxHours,
      startDate:
        pro.startDate !== null
          ? new Date(pro.startDate).toLocaleDateString("en-CA")
          : new Date().toLocaleDateString("en-CA"),
      endDate:
        pro.endDate !== null
          ? new Date(pro.endDate).toLocaleDateString("en-CA")
          : new Date().toLocaleDateString("en-CA"),
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      maxHours: Yup.number().required(),
      startDate: Yup.date(),
      endDate: Yup.date(),
    }),
    onSubmit: (value) => {
      handleProUpdate(value);
    },
    enableReinitialize: true,
  });

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

  const handleHoursWorkedChange = (index, value) => {
    const newItems = [...assignEmps];
    newItems[index].hoursWorked = value;
    newItems[index].changed = true;
    setAssignEmps(newItems);
    console.log(assignEmps);
  };

  const handleItemRemove = (index) => {
    const newItems = [...assignEmps];
    newItems[index].deleted = true;
    setAssignEmps(newItems);
    console.log(assignEmps);
  };

  const handleProDelete = (id) => {
    ProService.delete(id).then((res) => {
      if (res.data.errorCode === 0) {
        navigate("/project/list");
      }
    });
  };

  const handleProUpdate = (data) => {
    ProService.update(data).then((res) => {
      AssignService.assign(pro.projectId, assignEmps).then((res) => {
        navigate("/project/list");
      });
    });
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
                  {assignEmps.map((emp, idx) =>
                    !emp.deleted ? (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>{emp.firstName}</td>
                        <td>{emp.lastName}</td>
                        <td className="w-25">
                          <input
                            type="number"
                            className="form-control w-75"
                            min="0"
                            value={emp.hoursWorked}
                            onChange={(e) =>
                              handleHoursWorkedChange(idx, e.target.value)
                            }
                          />
                        </td>
                        <td>
                          <a href="#/" onClick={(e) => handleItemRemove(idx)}>
                            <i className="fa-solid fa-remove text-danger"></i>
                          </a>
                        </td>
                      </tr>
                    ) : null
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-md-5">
          <div className="border border-secondary rounded p-3">
            <h4>Project Infomation</h4>
            <hr />
            <table className="table table-borderless">
              <tbody>
                <TableField
                  fieldId="name"
                  fieldName="Project Name"
                  inputType="text"
                  frmField={formik.getFieldProps("name")}
                  err={formik.errors.name && formik.touched.name}
                  errMessage={formik.errors.name}
                />
                <TableField
                  fieldId="maxHours"
                  fieldName="Max Hours"
                  inputType="number"
                  frmField={formik.getFieldProps("maxHours")}
                  err={formik.errors.maxHours && formik.touched.maxHours}
                  errMessage={formik.errors.maxHours}
                />
                <TableField
                  fieldId="startDate"
                  fieldName="Start Date"
                  inputType="date"
                  frmField={formik.getFieldProps("startDate")}
                  err={formik.errors.startDate && formik.touched.startDate}
                  errMessage={formik.errors.startDate}
                />
                <TableField
                  fieldId="endDate"
                  fieldName="End Date"
                  inputType="date"
                  frmField={formik.getFieldProps("endDate")}
                  err={formik.errors.endDate && formik.touched.endDate}
                  errMessage={formik.errors.endDate}
                />
                <tr>
                  <th></th>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger me-2 my-2"
                      onClick={(e) => handleProDelete(pro.projectId)}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={formik.handleSubmit}
                    >
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
