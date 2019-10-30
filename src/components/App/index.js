import React, { Component } from "react";
import { createBrowserHistory } from "history";
import { connect } from "react-redux";
import { Route, Switch, withRouter } from "react-router-dom";
import axios from "axios";
import Home from "../../routes/home";
import Register from "../../routes/register";
import RegisterSuccess from "../../routes/register-success";
import SignIn from "../../routes/signin";
import ConfirmAccount from "../../routes/confirm-account";
import CreateProfileAfterRegister from "../../routes/create";
import Dashboard from "../../routes/Dashboard";
import MakeAMeal from "../../routes/make-a-meal";
import Detail from "../../routes/make-a-meal/Detail";
import NewConsumable from "../../routes/new-consumable";
import EditConsumable from "../../routes/edit-consumable";
import TodaysTotals from "../../routes/todays-totals";
import Consumed from "../../routes/Consumed";
import PageNotFound from "../../routes/404";
import Header from "../header";
import Footer from "../footer";
import Menu from "../menu";
import Loading from "../loading";
import Search from "../search";
import Alert from "../alert";
import StayBox from "../stayBox";
import ResetPassword from "../../routes/reset-password";
import ConfirmResetPasswordToken from "../../routes/confirm-reset-password-token";
import { setLoader } from "../../actions/loading.actions";
import {
  authenticate,
  setUser,
  beginSigningOut,
  resetIsSignedUp,
  setFormError
} from "../../actions/user.actions";
import { calculateTotals } from "../../actions/totals.actions";
import { setAlert } from "../../actions/alert.actions";
import { setStayBox } from "../../actions/staybox.actions";
import * as AppStyles from "./styles.scss";
import cookie from "my-simple-cookie";

export class App extends Component {
  locationListener;

  constructor(props) {
    super(props);

    axios.defaults.headers.post["crossDomain"] = true;
    document.title = "illLive!";
    this.handleStayBoxSetIsVisible = this.handleStayBoxSetIsVisible.bind(this);

    this.state = {
      isADashboardTypeOfView: false
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost/1337/api/user/new", {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => console.log(`RESSSS`, res))
      .catch(err => console.log(`ERRRRR`, err));
    const user_sid = cookie.get("user_sid");
    console.log(`USER_SID`, user_sid);
    //axios('test').then(res => console.log(res)).catch(e => console.log(e));
    // TODO think about if this should be in WillMount()
    if (user_sid && (typeof user_sid === "string" && user_sid !== "")) {
      this.props.authenticate();
    }

    this.locationListener = this.props.history.listen((location, action) => {
      const path = location.pathname.substr(1);
      if (
        path === "dashboard" ||
        path === "add" ||
        path === "make-a-meal" ||
        path === "totals"
      ) {
        this.setState({
          isADashboardTypeOfView: true
        });
      }

      if (this.props.user.errors && this.props.user.errors.length) {
        console.log(`this.props.user.errors`);
        if (
          path === "register" ||
          path === "signin" ||
          path === "reset-password"
        ) {
          this.props.setFormError("");
        }
      }
      // if formErrors is populated
      // if routing from the list of components that would use the formErrors
      // than freaking, call props.setFormErrorrs([])
    });
  }

  componentWillUnmount() {
    this.locationListener.unlisten();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(
      prevProps.resetPasswordEmailSent,
      this.props.resetPasswordEmailSent
    );
    const {
      isAuthenticating,
      isAuthenticated,
      confirmed24HourMealResetMessage,
      authenticationErrors,
      signInErrors,
      isSigningUp,
      isSigningIn,
      isSigningOut,
      isSignedUp,
      isSendingResetPasswordEmail,
      resetPasswordEmailSent,
      setLoader,
      history,
      formErrorText
    } = this.props;

    console.log(this.props.isSendingRecoverPasswordEmail);

    // Handle begining authentication
    if (!prevProps.isAuthenticating && isAuthenticating) {
      setLoader(true, "");
    }

    // Handle end or success/failure of authentication
    if (prevProps.isAuthenticating && !isAuthenticating) {
      if (isAuthenticated) {
        if (this.props.user.meals && this.props.user.meals.length > 0) {
          this.props.calculateTotals();
        }
      } else {
        console.log(`authenticationErrors`, this.props.authenticationErrors);
      }

      this.props.setLoader(false);
    }

    // Handle beginning signing up
    if (!prevProps.isSigningUp && isSigningUp) {
      setLoader(true, "Creating your account ...", false);
    }

    if (prevProps.isSigningUp && !isSigningUp) {
      // Handle successful sign up
      if (!prevProps.isSignedUp && isSignedUp) {
        setTimeout(() => {
          setLoader(true, "Account created!", false);
        }, 1400);

        this.props.resetIsSignedUp();

        setTimeout(() => {
          setLoader(true, "", true);
        }, 3200);

        setTimeout(() => {
          history.push("/register-success");
          setLoader(false);
        }, 4900);

        // TODO should be successfullSignUp or successfullRegistration
      } else if (
        this.props.accountCreated &&
        sessionStorage.getItem("account-created")
      ) {
        setTimeout(() => {
          setLoader(true, "There was some error. Please try again.", false);
        }, 1400);

        setTimeout(() => {
          setLoader(false);
        }, 3200);
      }
    }

    // Handle begin signing in
    if (!prevProps.isSigningIn && isSigningIn) {
      //setLoader(true, "Signing in ...", false);
    }

    // Handle finish signing in
    if (prevProps.isSigningIn && !isSigningIn) {
      if (isAuthenticated) {
        setLoader(true, "Signing in ...", false);
        if (this.props.user.meals && this.props.user.meals.length > 0) {
          this.props.calculateTotals();
        }
        setTimeout(() => {
          setLoader(true, "Signed in!", false);
        }, 1400);

        setTimeout(() => {
          setLoader(true, "", true);
        }, 3200);

        setTimeout(() => {
          history.push("/dashboard");
          setLoader(false);
        }, 4900);
      } else if (formErrorText !== "") {
        console.log(`Unsuccessful sign in.`);
        console.log(formErrorText);
        setLoader(false);
      }
    }

    // Handle begin signing out
    if (!prevProps.isSigningOut && isSigningOut) {
      setLoader(true, "Signing you out ...", false);
    }

    // Handle finish of signing out
    if (prevProps.isSigningOut && !isSigningOut) {
      setTimeout(() => {
        setLoader(true, "Signed out!", false);
      }, 1400);

      setTimeout(() => {
        setLoader(true, "", true);
      }, 3200);

      setTimeout(() => {
        history.push("/");
        setLoader(false);
      }, 4900);
    }

    // Handle sending a recovery email request
    if (!prevProps.isSendingResetPasswordEmail && isSendingResetPasswordEmail) {
      console.log(isSendingResetPasswordEmail);
      this.props.setLoader(true, "Sending an email ...", false);
    }

    // Handle successful recover password email sent
    if (!prevProps.resetPasswordEmailSent && resetPasswordEmailSent) {
      this.props.setLoader(true, "Email sent! Please check your email.", false);

      setTimeout(() => {
        this.props.setLoader(false);
      }, 3800);
    }
  }

  componentDidCatch(errorString, errorInfo) {
    console.warn(`[App] componentDidCatch()`, errorString, errorInfo);
  }

  handleStayBoxSetIsVisible(isVisible) {
    this.props.setStayBox(isVisible);
  }

  setCookieFlag() {
    alert("cookie");
  }

  render() {
    // if ( this.props.user) {
    //   if ( this.props.user.firstName && this.props.user.firstName !== '' ) {
    //     const menu = authenticatedRoutes.map(( route, index ) => {
    //       return <li><Link key={index + 1} to={route.path} onClick={this.props.toggleMenu}>{route.name}</Link></li>
    //     });
    //   }
    // }

    return (
      <div className="App" styles={AppStyles}>
        {/* A lot of CSS styles are inspected from https://github.com and copied into this application after
            a lot of time stressing over how to style this project. Thank you Github! */}
        {this.props.stayBoxIsVisible && (
          <StayBox
            isVisible={this.props.stayBoxIsVisible}
            text={this.props.stayBoxText}
            setIsVisible={this.handleStayBoxSetIsVisible}
          />
        )}{" "}
        <Loading />
        <Menu siteName={this.props.appName} />{" "}
        {this.props.alert.isVisible && (
          <Alert
            title={this.props.alert.title}
            body={this.props.alert.body}
            feeling={this.props.alert.feeling}
          />
        )}{" "}
        <Header siteName={this.props.appName} />{" "}
        <main>
          {" "}
          {
            <Switch>
              <Route exact path="/" component={Home} />{" "}
              <Route exact path="/register" component={Register} />{" "}
              <Route
                exact
                path="/register-success"
                component={RegisterSuccess}
              />{" "}
              <Route
                exact
                path="/my-details"
                component={CreateProfileAfterRegister}
              />{" "}
              <Route exact path="/signin" component={SignIn} />{" "}
              <Route
                exact
                path="/confirm-account/:token?"
                component={ConfirmAccount}
              />{" "}
              <Route exact path="/dashboard" component={Dashboard} />{" "}
              <Route exact path="/add" component={NewConsumable} />{" "}
              <Route exact path="/edit" component={EditConsumable} />{" "}
              <Route exact path="/make-a-meal" component={MakeAMeal} />{" "}
              <Route exact path="/totals" component={TodaysTotals} />{" "}
              <Route exact path="/consumed" component={Consumed} />{" "}
              <Route exact path="/search" component={Search} />{" "}
              <Route exact path="/detail/:id" component={Detail} />{" "}
              <Route
                exact
                path="/confirm-reset-password-token/:token?"
                component={ConfirmResetPasswordToken}
              />{" "}
              <Route exact path="/reset-password" component={ResetPassword} />{" "}
              <Route component={PageNotFound} />{" "}
            </Switch>
          }{" "}
          {/* TODO style and make it a component at some point. */}{" "}
          {/* <div id="cookie-agreement" onClick={this.setCookieFlag}>
                    We use cookies blah blah blah
                  </div> */}{" "}
        </main>{" "}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    appName: state.appReducers.appName,
    user: state.userReducers,
    isAuthenticated: state.userReducers.isAuthenticated,
    isAuthenticating: state.userReducers.isAuthenticating,
    isSigningIn: state.userReducers.isSigningIn,
    isSigningUp: state.userReducers.isSigningUp,
    isSigningOut: state.userReducers.isSigningOut,
    isSignedUp: state.userReducers.isSignedUp,
    authenticationErrors: state.userReducers.authenticationErrors,
    confirmedCookieFlag: state.userReducers.confirmedCookieFlag,
    signInErrors: state.userReducers.signInErrors,
    isSendingResetPasswordEmail: state.userReducers.isSendingResetPasswordEmail,
    isLoading: state.loadingReducers.isLoading,
    alert: state.alertReducers,
    stayBoxText: state.stayBoxReducers.text,
    stayBoxIsVisible: state.stayBoxReducers.isVisible
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authenticate: () => {
      dispatch(authenticate());
    },
    setLoader: (isLoading, loadingText, showSpinner = true) => {
      dispatch(setLoader(isLoading, loadingText, showSpinner));
    },
    setAlert: (isVisible, title = "", body = "") => {
      dispatch(setAlert(isVisible, title, body));
    },
    setUser: user => {
      dispatch(setUser(user));
    },
    setStayBox: (isVisible, text = "") => {
      dispatch(setStayBox(isVisible, text));
    },
    beginSigningOut: () => dispatch(beginSigningOut()),
    resetIsSignedUp: () => dispatch(resetIsSignedUp()),
    calculateTotals: () => dispatch(calculateTotals()),
    setFormError: error => dispatch(setFormError(error))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
