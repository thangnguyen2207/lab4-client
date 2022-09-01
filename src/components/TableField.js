import PropTypes from "prop-types";

const TableField = (props) => {
  const { fieldId, fieldName, inputType, frmField, err, errMessage } = props;
  return (
    <tr>
      <th>
        <label htmlFor={fieldId} className="form-label">
          {fieldName}
        </label>
      </th>
      <td>
        <input
          id={fieldId}
          type={inputType}
          className={`form-control ${err ? "is-invalid" : ""}`}
          {...frmField}
        />
        <div className="invalid-feedback">{errMessage}</div>
      </td>
    </tr>
  );
};

TableField.propTypes = {
  fieldId: PropTypes.string,
  fieldName: PropTypes.string,
  inputType: PropTypes.string,
  frmField: PropTypes.any,
  err: PropTypes.bool,
  errMessage: PropTypes.string,
};

export default TableField;
