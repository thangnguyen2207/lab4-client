import PropTypes from "prop-types";

const InputField = (props) => {
  const {
    fieldClass,
    fieldId,
    fieldName,
    inputType,
    frmField,
    err,
    errMessage,
  } = props;
  return (
    <div className={fieldClass}>
      <label htmlFor={fieldId} className="form-label">
        {fieldName}
      </label>
      <input
        id={fieldId}
        type={inputType}
        className={`form-control ${err ? "is-invalid" : ""}`}
        {...frmField}
      />
      <div className="invalid-feedback">{errMessage}</div>
    </div>
  );
};

InputField.propTypes = {
  fieldClass: PropTypes.string,
  fieldId: PropTypes.string,
  fieldName: PropTypes.string,
  inputType: PropTypes.string,
  frmField: PropTypes.any,
  err: PropTypes.bool,
  errMessage: PropTypes.string,
};

export default InputField;
