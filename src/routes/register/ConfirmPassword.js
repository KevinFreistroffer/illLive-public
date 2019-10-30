import React from "react";
import { PropTypes } from "prop-types";
import FormError from "../../components/FormError";

const ConfirmPassword = ({
  formGlobalError,
  error,
  handleOnChange,
  handleOnBlur
}) => {
  return (
    <div className="form-group">
      <label htmlFor="register-confirm-password">Confirm Password</label>
      <input
        name="confirm"
        type="password"
        id="register-confirm-password"
        className={error !== "" ? "form-error-input" : ""}
        placeholder="Confirm your password"
        autoComplete="password"
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        required
      />
      {formGlobalError === "" && error !== "" && <FormError>{error}</FormError>}
    </div>
  );
};

ConfirmPassword.displayName = "ConfirmPassword";

ConfirmPassword.propTypes = {
  formGlobalError: PropTypes.string,
  error: PropTypes.string,
  handleOnChange: PropTypes.func,
  handleOnBlur: PropTypes.func
};

export default ConfirmPassword;
