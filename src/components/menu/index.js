import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { toggleMenu } from "../../actions/menu.actions";
import { beginSigningOut } from "../../actions/user.actions";
import { setLoader } from "../../actions/loading.actions";
import {
  authenticatedRoutes,
  notAuthenticatedRoutes
} from "../../routesConfig";
import * as MenuStyles from "./styles.scss";
import classNames from "classnames";

export class Menu extends Component {
  // eslint-disable-line react/prefer-stateless-function
  routes;
  constructor(props) {
    super(props);

    this.state = {
      menuState: "closed"
    };
  }

  componentDidMount() {
    this.routes =
      this.props.username !== "" ? authenticatedRoutes : notAuthenticatedRoutes;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.username === "" && this.props.username !== "") {
      this.routes = authenticatedRoutes;
    }
  }

  signOut = () => {
    this.props.toggleMenu();
    this.props.beginSigningOut();
  };

  render() {
    const menuClassNames = classNames({});
    const { siteName, toggleMenu } = this.props;

    const SignOut =
      this.props.username !== "" ? (
        <div className="sign-out-link" onClick={this.signOut}>
          Sign Out
        </div>
      ) : null;

    return (
      <div
        className={`menu ${this.props.menuOpen ? "open fade-out" : "close"}`}
        styles={MenuStyles}
      >
        <div className="menu-overlay">
          <div className="menu-overlay-header flex row space-between align-center">
            <h1>
              <Link to="/">{siteName}</Link>
            </h1>
            <div className="close-menu" onClick={toggleMenu}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <nav>
            {this.routes &&
              this.routes.map((route, index) => {
                if (route.name !== "Intro Profile") {
                  return (
                    <Link key={index + 1} to={route.path} onClick={toggleMenu}>
                      <i className="far fa-circle"></i>&nbsp;&nbsp;&nbsp;&nbsp;
                      {route.name}
                    </Link>
                  );
                } else {
                  return null;
                }
              })}
            {SignOut}
          </nav>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.userReducers.username,
    menuOpen: state.menuReducers.menuOpen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    beginSigningOut: () => dispatch(beginSigningOut()),
    setLoader: (isLoading = false, loadingText = "") =>
      dispatch(setLoader(isLoading, loadingText)),
    toggleMenu: () => dispatch(toggleMenu())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
