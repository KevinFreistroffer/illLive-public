/**
 * Either a error message can be visible under an input, or as a global form
 * error message, so for UX, the form global error is passed to the input
 * components, to show or hide them based on if the form, global, error, exists
 */

import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import Login from "./Login";
import Password from "./Password";
import StaySignedIn from "./StaySignedIn";
import FormError from "../../components/FormError";
import { connect } from "react-redux";
import { Input } from "antd";
import {
  setUser,
  beginSigningIn,
  setFormError
} from "../../actions/user.actions";
import { setLoader } from "../../actions/loading.actions";
import * as SignInStyles from "./styles.scss";

export class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formSubmitted: false,
      signInSuccessfull: false,
      rememberMe: false,
      formErrorText: "",
      loginErrorText: "",
      passwordErrorText: "",
      login: "",
      password: ""
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRememberMeOnChange = this.handleRememberMeOnChange.bind(this);

    document.title = "Sign In";
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.props);
  }

  createInputValidationVariables(event) {
    const name = event.target.name;
    const capitalizedInputName = `${name[0].toUpperCase() + name.substr(1)}`;
    const value = event.target.value.replace(" ", "");
    const inputIsEmpty = value.length === 0 ? true : false;
    const inputNameErrorText = `${name}ErrorText`;

    return {
      name,
      capitalizedInputName,
      value,
      inputIsEmpty,
      inputNameErrorText
    };
  }

  inputsAreAllPopulated() {
    const loginValue = document
      .getElementById("signin-login")
      .value.replace(" ", "");
    const passwordValue = document
      .getElementById("signin-password")
      .value.replace(" ", "");

    return (
      this.state.login.replace(" ", "") !== "" &&
      loginValue !== "" &&
      this.state.password.replace(" ", "") !== "" &&
      passwordValue !== ""
    );
  }

  // TODO rename or add specific onChange for each unique event
  handleOnChange(event) {
    const {
      name,
      capitalizedInputName,
      value,
      inputIsEmpty,
      inputNameErrorText
    } = this.createInputValidationVariables(event);

    if (inputIsEmpty) {
      this.props.setFormError("");
    }

    // Sets the inputs value as the state value and if it's empty it outputs a error message.
    this.setState({
      formErrorText: "",
      [name]: value,
      [inputNameErrorText]: inputIsEmpty
        ? `${capitalizedInputName} is required.`
        : ""
    });
  }

  handleRememberMeOnChange() {
    this.setState({
      rememberMe: !this.state.rememberMe
    });
  }

  handleOnBlur(event) {
    const {
      capitalizedInputName,
      inputIsEmpty,
      inputNameErrorText
    } = this.createInputValidationVariables(event);

    // Handles empty values for all inputs
    this.setState({
      [inputNameErrorText]: inputIsEmpty
        ? `${capitalizedInputName} is required.`
        : ""
    });

    this.props.setFormError("");
  }

  handleSubmit(event) {
    event.preventDefault();

    // TODO IF the user is already signed in,
    //      show a alert thing letting them know
    //      they're already signed in. BYe.

    // If all inputs are populated ...
    if (this.inputsAreAllPopulated()) {
      // Show spinner icon
      this.setState({ formSubmitted: true });

      const credentials = {
        login: this.state.login,
        password: this.state.password,
        rememberMe: this.state.rememberMe
      };

      this.props.beginSigningIn(credentials);

      // Otherwise find the empty inputs
    } else {
      const stateLoginValue = this.state.login.replace(" ", "");
      const statePasswordValue = this.state.password.replace(" ", "");
      const loginValue = document
        .getElementById("signin-login")
        .value.replace(" ", "");
      const passwordValue = document
        .getElementById("signin-password")
        .value.replace(" ", "");

      // Is the username/email input empty?
      this.setState({
        loginErrorText:
          stateLoginValue === "" || loginValue === ""
            ? "Login is required."
            : ""
      });
      // Is the password input empty?
      this.setState({
        passwordErrorText:
          statePasswordValue === "" || passwordValue === ""
            ? "Password is required."
            : ""
      });
    }
  }

  render() {
    const {
      loginErrorText,
      passwordErrorText,
      formSubmitted,
      isSigningIn,
      validForm
    } = this.state;

    const { formErrorText } = this.props;

    return (
      <div
        className="signin flex column view-with-padding center-all"
        styles={SignInStyles}
      >
        <div className="h1-form-container flex center-all column">
          <h1 className="view-title">Sign In</h1>
          <div id="form-error">{formErrorText}</div>
          <form
            id="signin-form"
            className={`signin-form ${validForm ? "display-errors" : ""}`}
            onSubmit={this.handleSubmit}
            noValidate
          >
            <Login
              formGlobalError={formErrorText}
              error={loginErrorText}
              handleOnChange={this.handleOnChange}
              handleOnBlur={this.handleOnBlur}
            />

            <Password
              formGlobalError={formErrorText}
              error={passwordErrorText}
              handleOnChange={this.handleOnChange}
              handleOnBlur={this.handleOnBlur}
            />

            <StaySignedIn
              handleRememberMeOnChange={this.handleRememberMeOnChange}
            />

            <button type="submit">
              {this.props.isSigningIn && (
                <i className="fa fa-spinner fa-pulse"></i>
              )}
              {!this.props.isSigningIn && <div>Go</div>}
            </button>

            <h5 className="link-to-opposite-form">
              <Link to="/register">
                Need an account? <span> Sign up here.</span>
              </Link>
            </h5>
            <h6 className="link-to-reset-password">
              <Link to="/reset-password">
                Forgot password? <span>Click here</span>
              </Link>
            </h6>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.userReducers);
  return {
    user: state.userReducers,
    errors: state.userReducers.errors,
    isSigningIn: state.userReducers.isSigningIn,
    formErrorText: state.userReducers.formErrorText
  };
};

const mapDispatchToProps = dispatch => {
  return {
    beginSigningIn: credentials => dispatch(beginSigningIn(credentials)),
    setLoader: (isLoading = false, loadingText = "Loading ...") =>
      dispatch(setLoader(isLoading, loadingText)),
    setUser: user => {
      dispatch(setUser(user));
    },
    setFormError: error => dispatch(setFormError(error))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SignIn)
);
