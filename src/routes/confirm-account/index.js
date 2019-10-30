import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as _ from "lodash";
import axios from "axios";
import { beginConfirmingAccount } from "../../actions/user.actions";
import { setLoader } from "../../actions/loading.actions";
import { setStayBox } from "../../actions/staybox.actions";
import { setAlert } from "../../actions/alert.actions";
import { SERVER_URL } from "../../app-config";
import { INVALID_EMAIL_TEXT, EMAIL_REGEX } from "../../constants";
import * as ConfirmAccountStyles from "./styles.scss";

export class ConfirmAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accountConfirmed: false,
      token: "",
      invalidToken: false,
      email: "",
      emailErrorText: "",
      formText: "Confirm Your Account"
    };

    document.title = "Confirm your account";
  }

  componentDidMount() {
    this.props.setLoader(true, "");

    // They are authenticated
    if (this.props.isAuthenticated) {
      // They're email has already been confirmed.
      // Routing to their dashboard.
      if (this.props.isConfirmed) {
        this.props.setLoader(true, "");

        setTimeout(() => {
          this.props.setLoader(
            true,
            "Your account is already confirmed.",
            false
          );
        }, 2500);

        setTimeout(() => {
          this.props.setLoader(true, "Let's move onto the app.", false);
        }, 4800);

        setTimeout(() => {
          this.props.setLoader(false, "");
          this.props.history.push("/me/dashboard");
        }, 7000);
      } else {
        // Their email has not been confirmed.
        // There's no token in the URL.
        if (!this.props.match.params.token) {
          this.setState({
            formText:
              "Mmm ... there's something wrong. Try the link sent to your email again, or enter your email to have another link sent."
          });

          setTimeout(() => {
            this.props.setLoader(false, "");
          }, 2800);
        } else {
          // There is a token in the URL, so try confirming their email.
          this.props.beginConfirmingAccount(this.props.match.params.token);
        }
      }
    } else {
      // They are not authenticated
      // There's no token in the URL.
      if (!this.props.match.params.token) {
        this.setState({
          formText:
            "Mmm ... there's something wrong. Try the link sent to your email again, or enter your email to have another link sent."
        });

        setTimeout(() => {
          this.props.setLoader(false, "");
        }, 2800);
      } else {
        // There is a token in the URL.
        // Try confirming their email.
        this.props.beginConfirmingAccount(this.props.match.params.token);
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let errorObj = this.props.accountConfirmationError;

    console.log(prevProps, this.props);

    // Handle begin confirming account
    if (!prevProps.isConfirmingAccount && this.props.isConfirmingAccount) {
      this.props.setLoader(true, "Confirming your account.");
    }

    // Handle failure confirmation
    if (prevProps.isConfirmingAccount && !this.props.isConfirmingAccount) {
      // Handle failure confirmation
      if (!prevProps.isConfirmed && !this.props.isConfirmed) {
        if (!_.isEmpty(errorObj)) {
          this.setState(
            state => {
              let formText = errorObj.tokenExpired
                ? "Your token expired. Enter your email to have another token sent. You have 30 minutes to confirm that token."
                : "An error occured confirming your token. Please try refreshing the page, or enter your email for another token.";
              return {
                formText
              };
            },
            () => this.props.setLoader(false, "")
          );
        }
      }

      // Handle successful confirmation
      if (!prevProps.isConfirmed && this.props.isConfirmed) {
        this.setState(
          state => {
            this.props.setStayBox(false, "");
            this.props.setLoader(true, "Account confirmed!!! Please sign in.");

            return {
              formText: ""
            };
          },
          () => {
            setTimeout(() => {
              this.props.setLoader(false, "");
              this.props.history.push("/signin");
            }, 2500);
          }
        );
      }
    }

    // Handle if this page is opened when authenticating.
    if (!prevProps.isAuthenticated && this.props.isAuthenticated) {
      if (!this.props.match.params.token) {
        // They're signed in, there's no token, and their account
        // is already confirmed
        if (this.props.isConfirmed) {
          setTimeout(() => {
            this.props.setLoader(true, "Your account is already confirmed.");
          }, 2000);

          setTimeout(() => {
            this.props.setLoader(true, "Let's get onto the app!");
          }, 3800);

          setTimeout(() => {
            this.setLoader(false, "");
            this.props.history.push("/dashboard");
          }, 5500);
          // They're signed in, there's no token, and their accoumt is not
          // confirmed
        } else {
          this.setState({
            formText:
              "Mmm ... there's something wrong. Try the link again, or enter your email to have another link sent."
          });

          setTimeout(() => {
            this.props.setLoader(false);
          }, 2800);
        }
        // They're signed in, and there is a token
      } else {
        if (this.props.isConfirmed) {
          this.props.setLoader(true, "");

          this.setState({
            formText: "Your account is already confirmed."
          });

          setTimeout(() => {
            this.props.setLoader(
              true,
              "Your account is already confirmed.",
              false
            );
          }, 2000);

          setTimeout(() => {
            this.props.setLoader(true, "Routing to your dashboard.");
          }, 3800);

          setTimeout(() => {
            this.props.setLoader(false, "");
            this.props.history.push("/dashboard");
          }, 3800);
        }

        this.props.beginConfirmingAccount(this.props.match.params.token);
      }
    }
  }

  emailNewToken = () => {
    if (this.state.email.replace(" ", "") !== "") {
      if (this.state.email.match(EMAIL_REGEX)) {
        axios(`${SERVER_URL}/auth/resend-confirmation-email`, {
          method: "post",
          crossDomain: true,
          mode: "no-cors",
          headers: { "Content-type": "application/json" },
          data: { email: this.state.email }
        })
          .then(response => {
            this.setState({ formText: response.message });
            this.props.setAlert(true, "Confirmation Email", "Email sent!");
          })
          .catch(error => {
            console.log(error);
            // TODO handle error
            this.setState({ formText: error });

            console.log(
              `[ConfirmAccount] error POSTing auth/resend-confirmation | error: ${error}`
            );
          });
      } else {
        this.setState({ emailErrorText: INVALID_EMAIL_TEXT });
      }
    } else {
      this.setState({ emailErrorText: "Email is required." });
    }
  };

  handleOnChange = event => {
    this.setState({
      email: event.target.value,
      emailErrorText:
        event.target.value.replace(" ", "") === "" ? "Email is required." : ""
    });
  };

  handleOnBlur = event => {
    if (this.state.email.replace(" ", "") !== "") {
      const validEmail = this.state.email.match(EMAIL_REGEX);

      this.setState({ emailErrorText: !validEmail ? INVALID_EMAIL_TEXT : "" });
    } else {
      this.setState({ emailErrorText: "Email is required." });
    }
  };

  render() {
    let confirmErrorObj = this.props.accountConfirmationError;
    let EmailInput;
    let SuccessLink;
    let emailErrorText =
      this.state.emailErrorText !== "" ? (
        <div className="form-error-text">{this.state.emailErrorText}</div>
      ) : (
        ""
      );

    EmailInput =
      !_.isEmpty(confirmErrorObj) && confirmErrorObj.tokenExpired ? (
        <div className="form-group">
          <div className="email-button-group">
            <input
              type="email"
              name="email"
              placeholder="Your email"
              onChange={this.handleOnChange}
              onBlur={this.handleOnBlur}
            />
            <button type="submit" onClick={this.emailNewToken}>
              Send
            </button>
          </div>
          {emailErrorText}
        </div>
      ) : (
        ""
      );

    SuccessLink = this.props.isConfirmed ? (
      <div className="form-group">
        <Link to="/signin" className="success-link">
          Account confirmed. Click here to sign in!
        </Link>
      </div>
    ) : (
      ""
    );

    return (
      <div className="confirm-account view" styles={ConfirmAccountStyles}>
        <div className="view-header">
          <h1 className="view-title">Confirm Account</h1>
        </div>
        <div className="view-main flex column center-all">
          <h1 className="">{this.state.formText}</h1>
          {EmailInput}
          {SuccessLink}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.userReducers.confirmationToken,
    isAuthenticating: state.userReducers.isAuthenticating,
    isAuthenticated: state.userReducers.isAuthenticated,
    isConfirmingAccount: state.userReducers.isConfirmingAccount,
    isConfirmed: state.userReducers.accountConfirmed,
    accountConfirmationError: state.userReducers.accountConfirmationError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    beginConfirmingAccount: token => dispatch(beginConfirmingAccount(token)),
    setStayBox: (isVisible, text) => dispatch(setStayBox(isVisible, text)),
    setAlert: (isVisible, body = "", text = "") =>
      dispatch(setAlert(isVisible, body, text)),
    setLoader: (
      isLoading = false,
      loadingText = "Loading ...",
      showSpinner = true
    ) => dispatch(setLoader(isLoading, loadingText, showSpinner))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmAccount);
