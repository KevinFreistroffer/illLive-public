import React, { Component } from "react";
import { connect } from "react-redux";
import FormError from "../../components/FormError";
import { beginPasswordReset } from "../../actions/user.actions";
import * as ResetPasswordStyles from "./styles.scss";
import { setLoader } from "../../actions/loading.actions";

export class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formSubmitted: false,
      email: "",
      emailSentSuccessful: false,
      formErrorText: "",
      emailErrorText: ""
    };
  }

  handleOnChange = event => {
    console.log(`handleOnChange event`, event.target.value);
    this.setState(
      {
        email: event.target.value
      },
      () => {
        console.log(this.state.email);
      }
    );
  };

  handleSubmit = event => {
    console.log(`handleSubmit`, event.target.value);
    this.props.beginPasswordReset(this.state.email.trim());
  };

  render() {
    return (
      <div
        className="reset-password flex column view-with-padding center-all"
        styles={ResetPasswordStyles}
      >
        <div id="headings-and-form-container">
          <h1 className="view-title">Forgot Password</h1>
          <h2>
            Enter your email address and we will send you a link to reset your
            password.
          </h2>
          <form noValidate>
            <div class="form-control">
              <input
                type="email"
                placeholder="Enter your email"
                onChange={this.handleOnChange}
              />
              <button type="button" onClick={this.handleSubmit}>
                Reset Password
              </button>
              <FormError error={this.state.formError} />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    beginPasswordReset: email => dispatch(beginPasswordReset(email)),
    setLoader: (isVisible, text, showSpinner = false) =>
      dispatch(setLoader(isVisible, text, showSpinner))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPassword);
