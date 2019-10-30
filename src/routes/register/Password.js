import React, { useEffect } from "react";
import { PropTypes } from "prop-types";
import FormError from "../../components/FormError";

const Password = ({ formGlobalError, error, handleOnChange, handleOnBlur }) => {
  useEffect(() => {
    console.log(formGlobalError, error);
  });
  return (
    <div className="form-group">
      <label htmlFor="register-password">Password</label>
      <input
        name="password"
        type="password"
        id="register-password"
        className={error !== "" ? "form-error-input" : ""}
        placeholder="Password"
        autoComplete="off"
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        required
      />
      {formGlobalError === "" && error !== "" && <FormError>{error}</FormError>}
    </div>
  );
};

Password.displayName = "Password";

Password.propTypes = {
  formGlobalError: PropTypes.string,
  error: PropTypes.string,
  handleOnChange: PropTypes.func,
  handleOnBlur: PropTypes.func
};

export default Password;
