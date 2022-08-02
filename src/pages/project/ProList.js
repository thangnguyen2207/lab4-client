import { Fragment, useEffect, useMemo, useState } from "react";
import ProService from "../../services/ProService";
import DataTable from "react-data-table-component";
import moment from "moment";
import DataTableHeader from "../../components/DataTableHeader";

const ProList = (props) => {
  const [hideNo, setHideNo] = useState(false);
  const [hideName, setHideName] = useState(false);
  const [hideMaxHours, setHideMaxHours] = useState(false);
  const [hideStartDate, setHideStartDate] = useState(false);
  const [hideEndDate, setHideEndDate] = useState(false);

  const columns = useMemo(
    () => [
      {
        name: "No.",
        selector: (row, idx) => idx + 1,
        omit: hideNo,
      },
      {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
        omit: hideName,
      },
      {
        name: "Max Hours",
        selector: (row) => row.maxHours,
        sortable: true,
        omit: hideMaxHours,
      },
      {
        name: "Start Date",
        selector: (row) => row.startDate,
        format: (row) =>
          row.startDate != null
            ? moment(row.startDate).format("DD/MM/YYYY")
            : "",
        sortable: true,
        omit: hideStartDate,
      },
      {
        name: "End Date",
        selector: (row) => row.endDate,
        format: (row) =>
          row.endDate != null ? moment(row.endDate).format("DD/MM/YYYY") : "",
        sortable: true,
        omit: hideEndDate,
      },
      {
        button: true,
        cell: () => (
          <a href="/#" className="btn btn-primary">
            Detail...
          </a>
        ),
      },
    ],
    [hideNo, hideName, hideMaxHours, hideStartDate, hideEndDate]
  );

  const [pros, setPros] = useState([]);
  const [filterText, setFilterText] = useState("");
  const filteredItems = pros.filter(
    (pro) =>
      (pro.name !== null
        ? pro.name.toLowerCase().includes(filterText.toLowerCase())
        : false) ||
      (pro.maxHours !== null
        ? pro.maxHours.toString().includes(filterText.toLowerCase())
        : false) ||
      (pro.startDate !== null
        ? moment(pro.startDate)
            .format("DD/MM/YYYY")
            .includes(filterText.toLowerCase())
        : false) ||
      (pro.endDate !== null
        ? moment(pro.endDate)
            .format("DD/MM/YYYY")
            .includes(filterText.toLowerCase())
        : false)
  );
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const SubHeaderComponent = useMemo(() => {
    return (
      <DataTableHeader
        filter={true}
        onFilter={(e) => {
          setResetPaginationToggle(!resetPaginationToggle);
          setFilterText(e.currentTarget.value);
        }}
        filterText={filterText}
        filterPlaceHolder="Filter by name"
        exportData={filteredItems}
        exportFilename="project"
        dropdownItems={[
          {
            name: "No.",
            checked: true,
            onCheck: (e) =>
              e.currentTarget.checked ? setHideNo(false) : setHideNo(true),
          },
          {
            name: "Name",
            checked: true,
            onCheck: (e) =>
              e.currentTarget.checked ? setHideName(false) : setHideName(true),
          },
          {
            name: "Max Hours",
            checked: true,
            onCheck: (e) =>
              e.currentTarget.checked
                ? setHideMaxHours(false)
                : setHideMaxHours(true),
          },
          {
            name: "Start Date",
            checked: true,
            onCheck: (e) =>
              e.currentTarget.checked
                ? setHideStartDate(false)
                : setHideStartDate(true),
          },
          {
            name: "End Date",
            checked: true,
            onCheck: (e) =>
              e.currentTarget.checked
                ? setHideEndDate(false)
                : setHideEndDate(true),
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
    document.title = "Project List";
    loadData();
  }, []);

  const loadData = () => {
    ProService.list().then((res) => {
      setPros(res);
    });
  };

  return (
    <Fragment>
      <h1 className="h3">Project List</h1>
      <hr />

      <DataTable
        columns={columns}
        data={filteredItems}
        striped
        highlightOnHover
        pagination
        paginationResetDefaultPage={resetPaginationToggle}
        expandableRows
        expandableRowsComponent={ExpandedComponent}
        subHeader
        subHeaderComponent={SubHeaderComponent}
        persistTableHead
      />
    </Fragment>
  );
};

export default ProList;
