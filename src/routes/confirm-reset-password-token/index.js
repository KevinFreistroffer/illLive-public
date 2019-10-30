import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { confirmResetPasswordToken } from "../../services/user.service";
import { setLoader } from "../../actions/loading.actions";
import * as CSS from "./styles.scss";
import { PASSWORDS_MATCH_ERROR_TEXT, EMAIL_REGEX } from "../../constants";
import configs from "../../configs";
import * as _ from "lodash";
import axios from "axios";

const styles = {
  a: {
    color: "#000"
  }
};

export class ConfirmResetPasswordToken extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMounted: false,
      isValidToken: false,
      showForm: false,
      formSubmitted: false,
      isValidForm: false,
      password: "",
      confirm: "",
      email: "",
      passwordErrorText: "",
      confirmErrorText: "",
      emailErrorText: "",
      formErrorText: "",
      email: ""
    };

    document.title = "Reset Password";
  }

  componentDidMount() {
    this.props.setLoader(true, "", true);
    this.setState({ isMounted: true }, () => {
      console.log(this.props.match.params.token);
      const token = this.props.match.params.token;

      if (token) {
        confirmResetPasswordToken(token)
          .then(response => {
            if (response.status === 200 || response.status === 304) {
              this.props.setLoader(false);
              this.setState({
                isValidToken: true,
                showForm: true,
                email: response.data.email
              });
            } else if (response.status === 404) {
              this.props.setLoader(false);
              this.setState({
                showForm: false,
                invalidToken: true
              });
            }
          })
          .catch(error => {
            console.log(
              `An error occured confirming reset password token`,
              error
            );
            this.props.setLoader(false);
            this.setState({
              showForm: false,
              invalidToken: true
            });
          });
      }
    });
  }

  inputsAreAllPopulated = () => {
    console.log(`inputsAreAllPopulated()`);
    // TODO: I just added the document.getElem ... test if it works.
    let state = this.state;
    let password = document.getElementById("password").value.replace(" ", "");
    let confirm = document.getElementById("confirm").value.replace(" ", "");

    return (
      state.password.replace(" ", "") &&
      password &&
      state.confirm.replace(" ", "") &&
      confirm !== ""
    );
  };

  handleOnChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  handleOnBlur = () => {
    const { email } = this.state;

    _.delay(function() {
      if (email.trim() === "") {
        // this.emailErrorText = 'Email required'
        this.setState({
          emailErrorText: "Email required"
        });
      }

      if (email.trim() !== "" && !this.isValidEmail(email)) {
        this.setState({
          emailErrorText: "Invalid email"
        });
      }

      if (email.trim() !== "" && this.isValidEmail(email)) {
        this.setState({
          emailErrorText: ""
        });
      }
    }, 300);
  };

  sendNewEmailLink = () => {
    axios(`${configs.apiUrl}/auth/send-new-reset-password-email`, {
      method: "POST",
      data: {
        email: this.state.email
      }
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(`An error occured sending a new email link`, error);
      });
  };

  onSubmit = () => {
    this.setState(
      {
        formSubmitted: true
      },
      () => {
        if (this.inputsAreAllPopulated()) {
          if (this.passwordsMatch()) {
            console.log(`inputsAreAllPopualted passwordMatch`);
            this.setState({ formSubmitted: true }, () => {
              axios(`${configs.apiUrl}/auth/reset-password`, {
                method: "POST",
                withCredentials: true,
                data: {
                  email:
                    this.state.email && this.state.email !== ""
                      ? this.state.email
                      : "",
                  password: this.state.password
                }
              })
                .then(response => {
                  console.log(response);
                  this.setState({ formSubmitted: true });
                })
                .catch(error => {
                  console.log(error);
                });
            });
          } else {
            // set formErrorText 'Password's don't match'
          }
        } else {
          // set formErrorText 'Fill out the form'
        }
      }
    );
  };

  passwordsMatch = () => {
    return (
      this.state.password.replace(" ", "") ===
      this.state.confirm.replace(" ", "")
    );
  };

  isValidEmail = email => {
    return email.match(EMAIL_REGEX);
  };

  render() {
    return (
      <div className="confirm-reset-password-token">
        {!this.state.isMounted && <></>}
        {this.state.isMounted && this.state.invalidToken && (
          <div id="invalid-token" className="flex column center-all">
            <h1>
              Looks like that link expired. <br /> Enter your email address to
              have another one sent
            </h1>
            <form>
              <input
                name="email"
                type="email"
                onChange={this.handleOnChange}
                onBlur={this.handleOnBlur}
                placeholder="Email address"
              />
              <button type="button" onClick={this.sendNewEmailLink}>
                Send new link
              </button>
              <div className="form-error">{this.state.emailErrorText}</div>
            </form>
          </div>
        )}
        {this.state.isMounted && this.state.showForm && (
          <div
            className="confirm-reset-password-token flex column center-all view-with-padding"
            styles={CSS}
          >
            <input type="email" placeholder="Email address" />
            <div id="h1-and-form-container">
              <h1>New password</h1>
              {this.state.formErrorText}
              <form className="flex  column center-all">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="New password"
                  onChange={this.handleOnChange}
                  onBlur={this.handleOnBlur}
                />
                {this.state.passwordErrorText}
                <input
                  id="confirm"
                  name="confirm"
                  type="password"
                  placeholder="Confirm new password"
                  onChange={this.handleOnChange}
                  onBlur={this.handleOnBlur}
                />
                {this.state.confirmErrorText}
                <button type="button" onClick={this.onSubmit}>
                  Save new password
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ...state };
};

const mapDispatchToProps = dispatch => {
  return {
    setLoader: (isVisible, text, showSpinner = false) =>
      dispatch(setLoader(isVisible, text, showSpinner))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmResetPasswordToken);
