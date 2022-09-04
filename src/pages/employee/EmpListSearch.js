import { Fragment, useEffect, useRef, useState, useMemo } from "react";
import EmpService from "../../services/EmpService";
import DataTable from "react-data-table-component";
import ProService from "../../services/ProService";
import DataTableHeader from "../../components/DataTableHeader";

const EmpListSearch = ({ setLoading }) => {
  const [hideNo, setHideNo] = useState(false);
  const [hideFirstName, setHideFirstName] = useState(false);
  const [hideLastName, setHideLastName] = useState(false);
  const [hidePhone, setHidePhone] = useState(false);
  const [hideEmail, setHideEmail] = useState(false);
  const [hideHoursWorked, setHideHoursWorked] = useState(false);

  const columns = useMemo(
    () => [
      {
        name: "No.",
        selector: (row, idx) => idx + 1,
        omit: hideNo,
      },
      {
        name: "First Name",
        selector: (row) => row.firstName,
        sortable: true,
        omit: hideFirstName,
      },
      {
        name: "Last name",
        selector: (row) => row.lastName,
        sortable: true,
        omit: hideLastName,
      },
      {
        name: "Phone",
        selector: (row) => row.phone,
        sortable: true,
        omit: hidePhone,
      },
      {
        name: "Email",
        selector: (row) => row.email,
        sortable: true,
        omit: hideEmail,
      },
      {
        name: "Hours Worked",
        selector: (row) => row.hoursWorked,
        sortable: true,
        omit: hideHoursWorked,
      },
    ],
    [hideEmail, hideFirstName, hideHoursWorked, hideLastName, hideNo, hidePhone]
  );

  const projectRef = useRef(0);
  const [emps, setEmps] = useState([]);
  const [pros, setPros] = useState([]);
  const [filterText, setFilterText] = useState("");
  const filteredItems = emps.filter(
    (emp) =>
      (emp.phone !== null
        ? emp.phone.includes(filterText.toLowerCase())
        : false) ||
      (emp.email !== null
        ? emp.email.includes(filterText.toLowerCase())
        : false) ||
      (emp.firstName !== null
        ? emp.firstName.toLowerCase().includes(filterText.toLowerCase())
        : false) ||
      (emp.lastName !== null
        ? emp.lastName.toLowerCase().includes(filterText.toLowerCase())
        : false) ||
      (emp.hoursWorked !== null
        ? emp.hoursWorked.toString().includes(filterText.toLowerCase())
        : false)
  );
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const subHeaderComponent = useMemo(() => {
    return (
      <DataTableHeader
        filter={true}
        onFilter={(e) => {
          setFilterText(e.currentTarget.value);
          setResetPaginationToggle(!resetPaginationToggle);
        }}
        filterText={filterText}
        filterPlaceHolder="Search"
        exportData={filteredItems}
        exportFilename="employeeSearch"
        dropdownItems={[
          {
            name: "No.",
            checked: true,
            onCheck: (e) =>
              e.currentTarget.checked ? setHideNo(false) : setHideNo(true),
          },
          {
            name: "First Name",
            checked: true,
            onCheck: (e) =>
              e.currentTarget.checked
                ? setHideFirstName(false)
                : setHideFirstName(true),
          },
          {
            name: "Last Name",
            checked: true,
            onCheck: (e) =>
              e.currentTarget.checked
                ? setHideLastName(false)
                : setHideLastName(true),
          },
          {
            name: "Phone",
            checked: true,
            onCheck: (e) =>
              e.currentTarget.checked
                ? setHidePhone(false)
                : setHidePhone(true),
          },
          {
            name: "Email",
            checked: true,
            onCheck: (e) =>
              e.currentTarget.checked
                ? setHideEmail(false)
                : setHideEmail(true),
          },
          {
            name: "Hours Worked",
            checked: true,
            onCheck: (e) =>
              e.currentTarget.checked
                ? setHideHoursWorked(false)
                : setHideHoursWorked(true),
          },
        ]}
      />
    );
  }, [filterText, resetPaginationToggle, filteredItems]);

  const ExpandedComponent = ({ data }) => (
    <pre>
      <div className="bg-light p-3">{JSON.stringify(data, null, 2)}</div>
    </pre>
  );

  useEffect(() => {
    document.title = "Employee List";
    loadData();
    setTimeout(() => setLoading(false), 500);
  }, [setLoading]);

  const loadData = () => {
    ProService.list().then((res) => {
      setPros(res.data);
      EmpService.assignList(res.data[0].projectId).then((res) => {
        setEmps(res.data);
      });
    });
  };

  const searchData = () => {
    EmpService.assignList(projectRef.current.value).then((res) => {
      setEmps(res.data);
    });
  };

  return (
    <Fragment>
      <h1 className="h3">Employee List (Search)</h1>
      <hr />

      <div className="mb-4 pt-2">
        <div className="row">
          <div className="col-auto">
            <label htmlFor="project" className="mt-1">
              Select Project
            </label>
          </div>
          <div className="col-auto">
            <select
              id="project"
              className="form-select"
              ref={projectRef}
              onChange={searchData}
            >
              {pros.map((pro, idx) => (
                <option value={pro.projectId} key={idx}>
                  {pro.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={filteredItems}
        striped
        highlightOnHover
        pagination
        expandableRows
        expandableRowsComponent={ExpandedComponent}
        paginationResetDefaultPage={resetPaginationToggle}
        subHeader
        subHeaderComponent={subHeaderComponent}
        persistTableHead
      />
    </Fragment>
  );
};

export default EmpListSearch;
