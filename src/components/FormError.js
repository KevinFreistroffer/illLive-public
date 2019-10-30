import React, { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import { INVALID_EMAIL_TEXT } from "../constants";

const FormError = props => {
  const [emailErrorText, setEmailErrorText] = useState("");

  useEffect(() => {
    console.log(props.inputName);
    let children = React.Children.toArray(props.children).map(
      childErrorText => {
        setEmailErrorText(childErrorText);
      }
    );
  });

  return (
    <div
      id={`${
        props.inputName &&
        props.inputName === "email" &&
        emailErrorText === INVALID_EMAIL_TEXT
          ? "email-form-error-text"
          : ""
      }`}
      className="form-error-text flex center-all"
    >
      {props.children}
    </div>
  );
};

FormError.displayName = "FormError";

FormError.propTypes = {
  inputName: PropTypes.oneOfType([PropTypes.string, PropTypes.any]),
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.node
  ])
};

export default FormError;
