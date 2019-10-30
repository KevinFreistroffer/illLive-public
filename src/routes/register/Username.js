import React, { useEffect } from "react";
import { PropTypes } from "prop-types";
import FormError from "../../components/FormError";

const Username = ({ formGlobalError, error, handleOnChange, handleOnBlur }) => {
  useEffect(() => {
    console.log(error);
  });
  return (
    <div className="form-group">
      <label htmlFor="register-username">Username</label>
      <input
        name="username"
        type="text"
        id="register-username"
        className={error !== "" ? "form-error-input" : ""}
        placeholder="Username"
        autoComplete="on"
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        required
      />
      {formGlobalError === "" && error !== "" && <FormError>{error}</FormError>}
    </div>
  );
};

Username.displayName = "Username";

Username.propTypes = {
  formGlobalError: PropTypes.string,
  error: PropTypes.string,
  handleOnChange: PropTypes.func,
  handleOnBlur: PropTypes.func
};

export default Username;
