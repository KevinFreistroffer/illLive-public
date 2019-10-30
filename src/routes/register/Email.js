import React from "react";
import { PropTypes } from "prop-types";
import FormError from "../../components/FormError";

const Email = ({
  formGlobalError,
  error,
  pattern,
  handleOnChange,
  handleOnBlur
}) => {
  return (
    <div className="form-group">
      <label htmlFor="register-email">Email</label>
      <input
        name="email"
        type="email"
        id="register-email"
        className={error !== "" ? "form-error-input" : ""}
        placeholder="Email"
        autoComplete="email"
        pattern={pattern}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        required
      />
      {formGlobalError === "" && error !== "" && (
        <FormError inputName="email">{error}</FormError>
      )}
    </div>
  );
};

Email.displayName = "Email";

Email.propTypes = {
  formGlobalError: PropTypes.string,
  error: PropTypes.string,
  pattern: PropTypes.object,
  handleOnChange: PropTypes.func,
  handleOnBlur: PropTypes.func
};

export default Email;
