import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  setUser,
  beginSigningUp,
  successSigningUp,
  failureSigningUp,
  setFormError
} from "../../actions/user.actions";
import { setLoader } from "../../actions/loading.actions";
import { signUp as sendSignUpRequest } from "../../services/user.service";
import * as registerStyles from "./styles.scss";
import Username from "./Username";
import Email from "./Email";
import Password from "./Password";
import ConfirmPassword from "./ConfirmPassword";
import {
  EMAIL_REGEX,
  INVALID_EMAIL_TEXT,
  PASSWORDS_MATCH_ERROR_TEXT
} from "../../constants";

export class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formSubmitted: false,
      registerSuccessfull: false,
      formErrorText: "", // should be undefined for simplicity of reading ie !formErrortext or !globalFormError
      usernameErrorText: "",
      emailErrorText: "",
      passwordErrorText: "",
      confirmErrorText: "",
      username: "",
      email: "",
      password: "",
      confirm: ""
    };

    document.title = "Sign Up";
  }

  // Returns properties ( name, capitalized name, value, inputIsEmpty, '[name of input]ErrorText' )
  createInputValidationVariables(event) {
    // Name of the input
    const name = event.target.name;
    // Formats the name of the input to show error message
    const capitalizedInputName =
      name !== "confirm"
        ? `${name[0].toUpperCase() + name.substr(1)}`
        : "Your password confirmation";
    // Value of the input plus white space removed
    const value = event.target.value.replace(" ", "");
    // Checks if the input is empty
    const inputIsEmpty = value.length === 0 ? true : false;
    // Sets the error text name for the current input
    const inputNameErrorText = `${name}ErrorText`;

    return {
      name,
      capitalizedInputName,
      value,
      inputIsEmpty,
      inputNameErrorText
    };
  }

  componentDidMount() {
    console.log(this.props.location.pathName);
    this.setState({
      currentRoute: this.props.location.pathName
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isSigningUp && !this.props.isSigningUp) {
      this.setState({
        formSubmitted: false
      });
    }
  }

  inputsAreAllPopulated = () => {
    console.log(`inputsAreAllPopulated()`);
    // TODO: I just added the document.getElem ... test if it works.
    let state = this.state;
    let username = document
      .getElementById("register-username")
      .value.replace(" ", "");
    let email = document
      .getElementById("register-email")
      .value.replace(" ", "");
    let password = document
      .getElementById("register-password")
      .value.replace(" ", "");
    let confirm = document
      .getElementById("register-confirm-password")
      .value.replace(" ", "");

    return (
      state.username.replace(" ", "") &&
      username &&
      state.email.replace(" ", "") &&
      email &&
      state.password.replace(" ", "") &&
      password &&
      state.confirm.replace(" ", "") &&
      confirm !== ""
    );
  };

  emailIsValid = () => {
    console.log(`emailIsValid()`);
    return this.state.email.match(EMAIL_REGEX);
  };

  passwordsMatch = () => {
    console.log(`passwordsMatch()`);
    const state = this.state;
    return state.password.replace(" ", "") === state.confirm.replace(" ", "");
  };

  handleOnChange = event => {
    // inputNameErrorText means 'emailErrorText' or 'usernameErrorText'.
    const {
      name,
      capitalizedInputName,
      value,
      inputIsEmpty,
      inputNameErrorText
    } = this.createInputValidationVariables(event);

    this.props.setFormError("");

    this.setState({
      formErrorText: "",
      [name]: value,
      [inputNameErrorText]: inputIsEmpty
        ? `${capitalizedInputName} is required.`
        : ""
    });

    // If the user is typing in the password input ...
    if (name === "password") {
      if (
        this.state.confirmErrorText === PASSWORDS_MATCH_ERROR_TEXT ||
        this.state.confirm.replace(" ", "") !== ""
      ) {
        // If the passwords end up matching, remove all errors
        if (value === this.state.confirm.replace(" ", "")) {
          this.setState({
            passwordErrorText: "",
            confirmErrorText: ""
          });

          // Else show the PASSWORDS_MATCH_ERROR_TEXT
        } else {
          this.setState({
            passwordErrorText: PASSWORDS_MATCH_ERROR_TEXT
          });
        }
      }
    }

    // If the user is typing in the confirm-password input ...
    if (name === "confirm") {
      // And the confirm password is showing the passwords must match error,
      // or confirm password is not an empty string
      if (
        this.state.passwordErrorText === PASSWORDS_MATCH_ERROR_TEXT &&
        this.state.password.replace(" ", "") !== ""
      ) {
        // If they match, remove all errors
        if (value === this.state.password.replace(" ", "")) {
          this.setState({
            passwordErrorText: "",
            confirmErrorText: ""
          });

          // Else show the PASSWORDS_MATCH_ERROR_TEXT
        } else {
          this.setState({
            confirmErrorText: PASSWORDS_MATCH_ERROR_TEXT
          });
        }
      }
    }
  };

  handleOnBlur = event => {
    const {
      name,
      capitalizedInputName,
      value,
      inputIsEmpty,
      inputNameErrorText
    } = this.createInputValidationVariables(event);

    // Handles empty values for all inputs
    if (inputIsEmpty) {
      this.setState({
        [inputNameErrorText]: inputIsEmpty
          ? `${capitalizedInputName} is required.`
          : ""
      });

      // Handles email, password, and confirm password validations
    } else {
      const passwordValue = document
        .getElementById("register-password")
        .value.replace(" ", "");
      const confirmValue = document
        .getElementById("register-confirm-password")
        .value.replace(" ", "");

      // Email validation
      if (name === "email") {
        this.setState({
          emailErrorText: !value.match(EMAIL_REGEX) ? INVALID_EMAIL_TEXT : ""
        });
      }

      // Idea is logically the user would enter a password THAN the confirm password input.
      // So if the user blurs confirm, it checks if the passwords match and outputs an error if they don't.
      if (name === "confirm") {
        this.setState({
          confirmErrorText:
            passwordValue !== confirmValue ? PASSWORDS_MATCH_ERROR_TEXT : ""
        });
      }
    }

    this.props.setFormError("");
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.inputsAreAllPopulated()) {
      // passwords matching is the only special condition required
      if (this.passwordsMatch()) {
        try {
          this.setState({ formSubmitted: true }, async () => {
            const body = {
              username: this.state.username,
              email: this.state.email,
              password: this.state.password
            };
            this.props.beginSigningUp(body);

            // POST to api/register
            // const registerResponse = await sendSignUpRequest(body);
            // const {
            //   status,
            //   data: {
            //     success,
            //     message,
            //     data: responseData,
            //     usernameTaken,
            //     emailTaken
            //   }
            // } = registerResponse;

            //console.log(status, success, message, responseData);

            // // TODO redo.
            // if (status === 201) {
            //   this.props.successSigningUp();
            // } else if (status === 404) {
            //   console.log(`404`);
            //   this.setState(
            //     {
            //       formErrorText: message,
            //       formSubmitted: false
            //     },
            //     () => {
            //       this.props.setLoader(false);
            //     }
            //   );
            // } else {
            //   //this.props.failureregister();
            //   if (usernameTaken || emailTaken) {
            //     this.setState(
            //       {
            //         formErrorText: message,
            //         formSubmitted: false
            //       },
            //       () => {
            //         this.props.setLoader(false);
            //       }
            //     );
            //   }
            // }
          });
        } catch (error) {}
      } else {
        if (!this.emailIsValid()) {
          this.setState({
            confirmErrorText: !this.passwordsMatch()
              ? PASSWORDS_MATCH_ERROR_TEXT
              : this.state.confirmErrorText
          });
        }
      }
    } else {
      // Output specific error texts
      const usernameValue = this.state.username.replace(" ", "");
      const emailValue = this.state.email.replace(" ", "");
      const passwordValue = this.state.password.replace(" ", "");
      const confirmValue = this.state.confirm.replace(" ", "");

      if (
        usernameValue === "" &&
        emailValue === "" &&
        passwordValue === "" &&
        confirmValue === ""
      ) {
        this.props.setFormError("Please fill out the form.");
      } else {
        this.props.setFormError("");

        this.setState({
          usernameErrorText:
            usernameValue === ""
              ? "Username is required."
              : this.state.usernameErrorText,
          emailErrorText:
            emailValue === ""
              ? "Email is required."
              : this.state.emailErrorText,
          passwordErrorText:
            passwordValue === ""
              ? "Password is required."
              : this.state.passwordValue === "",
          confirmErrorText:
            confirmValue === ""
              ? "Confirm password is required."
              : this.state.confirmErrorText
        });
      }
    }
  };

  render() {
    let FormErrorText,
      usernameErrorText,
      emailErrorText,
      passwordErrorText,
      confirmErrorText;

    return (
      <div
        className="register view-with-padding flex column center-all"
        styles={registerStyles}
      >
        <div className="mobile-nav-links flex space-around align-center">
          <Link
            to="/register"
            className={
              this.props.location.pathName === "register" ? "" : "active"
            }
          >
            Register
          </Link>
          <Link
            to="/signin"
            className={
              this.props.location.pathName !== "register" ? "" : "active"
            }
            signin
          >
            <span> Sign In</span>
          </Link>
        </div>
        <div className="h1-form-container">
          <h1 className="mobile-view-title">Account Setup</h1>
          <h1 className="view-title">Create your account</h1>

          <form
            id="register-form"
            className={`${this.state.validForm ? "display-errors" : ""}`}
            onSubmit={this.handleSubmit}
            noValidate
          >
            {this.props.formErrorText && this.props.formErrorText !== "" && (
              <div className="form-error">{this.props.formErrorText}</div>
            )}
            <Username
              formGlobalError={this.props.formErrorText}
              error={this.state.usernameErrorText}
              handleOnChange={this.handleOnChange}
              handleOnBlur={this.handleOnBlur}
            />

            <Email
              formGlobalError={this.props.formErrorText}
              error={this.state.emailErrorText}
              pattern={EMAIL_REGEX}
              handleOnChange={this.handleOnChange}
              handleOnBlur={this.handleOnBlur}
            />

            <Password
              formGlobalError={this.props.formErrorText}
              error={this.state.passwordErrorText}
              handleOnChange={this.handleOnChange}
              handleOnBlur={this.handleOnBlur}
            />

            <ConfirmPassword
              formGlobalError={this.props.formErrorText}
              error={this.state.confirmErrorText}
              handleOnChange={this.handleOnChange}
              handleOnBlur={this.handleOnBlur}
            />

            <button type="submit" onClick={this.onSubmit}>
              {this.state.formSubmitted && (
                <i className="fa fa-spinner fa-pulse"></i>
              )}
              {!this.state.formSubmitted && "All Set"}
            </button>

            <h6 className="link-to-opposite-form">
              <Link to="/signin">
                Already a member? <span> Sign in here.</span>
              </Link>
            </h6>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state,
    isSigningUp: state.userReducers.isSigningUp,
    formErrorText: state.userReducers.formErrorText
  };
};

const mapDispatchToProps = dispatch => {
  return {
    beginSigningUp: body => dispatch(beginSigningUp(body)),
    successSigningUp: () => dispatch(successSigningUp()),
    failureSigningUp: () => dispatch(failureSigningUp()),
    setLoader: (isLoading = false, loadingText = "Loading ...") =>
      dispatch(setLoader(isLoading, loadingText)),
    setUser: user => dispatch(setUser(user)),
    setFormError: error => dispatch(setFormError(error))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
