import { Fragment, useEffect, useMemo, useState } from "react";
import ProService from "../../services/ProService";
import DataTable from "react-data-table-component";
import moment from "moment";
import DataTableHeader from "../../components/DataTableHeader";
import { Button, Modal } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import InputField from "../../components/InputField";
import { toast } from "react-toastify";

const ProList = ({ setLoading }) => {
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    formik.resetForm();
  };

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
        cell: (row) => (
          <a
            href="/project/detail"
            className="btn btn-primary"
            onClick={(e) => localStorage.setItem("cur-proId", row.projectId)}
          >
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
        filterPlaceHolder="Search"
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
        modalBtn={true}
        modalBtnOnClick={handleShowModal}
        modalBtnTitle={
          <Fragment>
            <i className="fa-solid fa-plus"></i>
            <span> Add </span>
          </Fragment>
        }
      />
    );
  }, [filterText, resetPaginationToggle, filteredItems]);

  const ExpandedComponent = ({ data }) => (
    <pre>
      <div className="bg-light p-3">{JSON.stringify(data, null, 2)}</div>
    </pre>
  );

  const formik = useFormik({
    initialValues: {
      name: "",
      maxHours: 0,
      startDate: new Date().toLocaleDateString("en-CA"),
      endDate: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      maxHours: Yup.number().required(),
      startDate: Yup.date(),
      endDate: Yup.date(),
    }),
    onSubmit: (value) => {
      handleSaveBtn(value);
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    document.title = "Project List";
    loadData();
    setTimeout(() => setLoading(false), 500);
  }, [setLoading]);

  const loadData = () => {
    ProService.list().then((res) => {
      setPros(res.data);
    });
  };

  const handleSaveBtn = (data) => {
    ProService.add(data)
      .then((res) => {
        toast.success("Data has been saved");
        handleCloseModal();
        loadData();
      })
      .catch(() => {
        toast.error("An error has occured");
      });
  };

  return (
    <Fragment>
      <h1 className="h3">Project List</h1>
      <hr />

      <Modal
        show={showModal}
        backdrop="static"
        keyboard={false}
        onHide={handleCloseModal}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row g-3">
            <InputField
              fieldClass="col-12"
              fieldId="name"
              fieldName="Name"
              inputType="text"
              frmField={formik.getFieldProps("name")}
              err={formik.errors.name && formik.touched.name}
              errMessage={formik.errors.name}
            />
            <InputField
              fieldClass="col-sm-4"
              fieldId="maxHours"
              fieldName="Max Hours"
              inputType="text"
              frmField={formik.getFieldProps("maxHours")}
              err={formik.errors.maxHours && formik.touched.maxHours}
              errMessage={formik.errors.maxHours}
            />
            <div className="col-sm-8 d-none d-sm-block"></div>
            <InputField
              fieldClass="col-sm-6"
              fieldId="startDate"
              fieldName="Start Date"
              inputType="date"
              frmField={formik.getFieldProps("startDate")}
              err={formik.errors.startDate && formik.touched.startDate}
              errMessage={formik.errors.startDate}
            />
            <InputField
              fieldClass="col-sm-6"
              fieldId="endDate"
              fieldName="End Date"
              inputType="date"
              frmField={formik.getFieldProps("endDate")}
              err={formik.errors.endDate && formik.touched.endDate}
              errMessage={formik.errors.endDate}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={formik.handleSubmit}
            disabled={!formik.dirty || !formik.isValid}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

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
