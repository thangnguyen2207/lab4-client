import PropTypes from "prop-types";
import React from "react";
import { Button } from "react-bootstrap";
import { CSVLink } from "react-csv";

const DataTableHeader = ({
  filter,
  onFilter,
  filterText,
  filterPlaceHolder,
  exportData,
  exportFilename,
  dropdownItems,
  modalBtn,
  modalBtnTitle,
  modalBtnOnClick,
}) => {
  return (
    <div className="w-100">
      <div className="row justify-content-end g-3">
        <div className="col-auto px-0 me-auto">
          {filter ? (
            <input
              type="text"
              className="form-control"
              placeholder={filterPlaceHolder}
              value={filterText}
              onChange={onFilter}
            />
          ) : null}
        </div>
        {modalBtn ? (
          <div className="col-auto">
            <Button variant="primary" onClick={modalBtnOnClick}>
              {modalBtnTitle}
            </Button>
          </div>
        ) : null}
        {exportData !== undefined && exportData !== null ? (
          <div className="col-auto">
            <CSVLink
              data={exportData}
              filename={exportFilename}
              className="btn btn-primary"
            >
              Export CSV
            </CSVLink>
          </div>
        ) : null}
        {dropdownItems !== undefined && dropdownItems !== null ? (
          <div className="col-auto">
            <div className="dropdown">
              <button
                type="button"
                id="simpleDropdown"
                className="btn btn-primary dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fa-solid fa-list pe-2"></i>
              </button>
              <ul className="dropdown-menu" aria-labelledby="simpleDropdown">
                {dropdownItems.map((item, idx) => (
                  <li key={idx}>
                    <div className="dropdown-item">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`item-${idx}`}
                        defaultChecked={true}
                        onChange={item.onCheck}
                      />
                      <label
                        className="form-check-label ps-4"
                        htmlFor={`item-${idx}`}
                      >
                        {item.name}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

DataTableHeader.propTypes = {
  filter: PropTypes.bool,
  onFilter: PropTypes.any,
  filterText: PropTypes.string,
  filterPlaceHolder: PropTypes.string,
  exportData: PropTypes.arrayOf(PropTypes.object),
  exportFilename: PropTypes.string,
  dropdownItems: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      checked: PropTypes.bool,
      onCheck: PropTypes.any,
    })
  ),
  modalBtn: PropTypes.bool,
  modalBtnTitle: PropTypes.any,
  modalBtnOnClick: PropTypes.any,
};

export default DataTableHeader;
