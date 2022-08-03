import { Fragment, useEffect, useState, useMemo } from "react";
import EmpService from "../../services/EmpService";
import DataTable from "react-data-table-component";
import DataTableHeader from "../../components/DataTableHeader";
import { Button, Modal } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputField from "../../components/InputField";
import { toast } from "react-toastify";

const EmpList = (props) => {
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    formik.resetForm();
  };

  const [hideNo, setHideNo] = useState(false);
  const [hideFirstName, setHideFirstName] = useState(false);
  const [hideLastName, setHideLastName] = useState(false);
  const [hidePhone, setHidePhone] = useState(false);
  const [hideEmail, setHideEmail] = useState(false);

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
        allowOverflow: true,
        omit: hidePhone,
      },
      {
        name: "Email",
        selector: (row) => row.email,
        sortable: true,
        omit: hideEmail,
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
    [hideFirstName, hideLastName, hidePhone, hideEmail, hideNo]
  );

  const [emps, setEmps] = useState(...[]);
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
        filterPlaceHolder="Filter by name"
        exportData={filteredItems}
        exportFilename="employee"
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
        ]}
        modalBtn={true}
        modalBtnOnClick={handleShowModal}
        modalBtnTitle={
          <Fragment>
            <i className="fa-solid fa-plus"></i>
            <span> Add</span>
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
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required(),
      lastName: Yup.string().required(),
      phone: Yup.string().required(),
      email: Yup.string().required().email(),
    }),
    onSubmit: (value) => {
      handleSaveBtn(value);
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    document.title = "Employee List";
    loadData();
  }, []);

  const loadData = () => {
    EmpService.list().then((res) => {
      setEmps(res);
    });
  };

  const handleSaveBtn = (data) => {
    EmpService.add(data).then((res) => {
      if (res.code === 0) {
        toast.success("Data has been saved");
      }
      handleCloseModal();
      loadData();
    });
  };

  return (
    <Fragment>
      <h1 className="h3">Employee List</h1>
      <hr />

      <Modal
        show={showModal}
        backdrop="static"
        keyboard={false}
        onHide={handleCloseModal}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row g-3">
            <InputField
              fieldClass="col-sm-6"
              fieldId="firstName"
              fieldName="First Name"
              inputType="text"
              frmField={formik.getFieldProps("firstName")}
              err={formik.errors.firstName && formik.touched.firstName}
              errMessage={formik.errors.firstName}
            />
            <InputField
              fieldClass="col-sm-6"
              fieldId="lastName"
              fieldName="Last Name"
              inputType="text"
              frmField={formik.getFieldProps("lastName")}
              err={formik.errors.lastName && formik.touched.lastName}
              errMessage={formik.errors.lastName}
            />
            <InputField
              fieldClass="col-12"
              fieldId="phone"
              fieldName="Phone"
              inputType="tel"
              frmField={formik.getFieldProps("phone")}
              err={formik.errors.phone && formik.touched.phone}
              errMessage={formik.errors.phone}
            />
            <InputField
              fieldClass="col-12"
              fieldId="email"
              fieldName="Email"
              inputType="email"
              frmField={formik.getFieldProps("email")}
              err={formik.errors.email && formik.touched.email}
              errMessage={formik.errors.email}
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
        subHeaderComponent={subHeaderComponent}
        persistTableHead
      />
    </Fragment>
  );
};

export default EmpList;
