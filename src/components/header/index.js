import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect, withRouter } from "react-router-dom";

import { beginSigningOut } from "../../actions/user.actions";
import { setLoader } from "../../actions/loading.actions";
import { toggleMenu } from "../../actions/menu.actions";
import { Menu } from "./Menu";
import * as HeaderStyles from "./styles.scss";
import configs from "../../configs";
import classNames from "classnames";
export class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentRoute: "",
      communicationType: "message",
      menuOpen: false,
      userSelectedSignOut: false,
      userMenuIsVisible: false,
      isDesktopViewport: false
    };
  }

  componentDidMount() {
    //console.log(`window.innerWidth`, window.innerWidth);
    this.setState({
      isDesktopViewport:
        window.innerWidth < configs.minDesktopViewport ? false : true
    });

    window.addEventListener("resize", () => {
      //console.log(`resize window.innerWidth`, window.innerWidth);
      this.setState({
        isDesktopViewport:
          window.innerWidth < configs.minDesktopViewport ? false : true
      });
    });
  }

  signOut = () => {
    this.props.signOut();
  };

  closeMenu = () => {
    this.setState({ userMenuIsVisible: false });
  };

  render() {
    const { isDesktopViewport } = this.state;
    const {
      user,
      siteName,
      menuOpen,
      location: { pathname }
    } = this.props;

    // TODO what is this?
    if (this.state.userSelectedSignOut) {
      return <Redirect to="/signin" />;
    }

    let IsAuthenticatedMenu;
    let MobileIsAuthenticatedMenu;
    let NotAuthenticatedRoutes;

    if (!user.isAuthenticated) {
      NotAuthenticatedRoutes = (
        <nav id="header-menu" className="header-menu not-authenticated">
          <div>
            <Link to="/signin">Sign In</Link>
          </div>
          <div>
            <Link className="register-link" to="/register">
              Sign Up
            </Link>
          </div>
        </nav>
      );
    } else {
      IsAuthenticatedMenu = (
        <nav id="header-menu" className="header-menu is-authenticated">
          <Link className="make-a-meal" to="/make-a-meal">
            Make A Meal
          </Link>
          <Link className="dashboard" to="/dashboard">
            Dashboard
          </Link>
          <Link className="totals" to="/totals">
            Todays Totals
          </Link>
          <h2
            className="header-user-name"
            onMouseLeave={() => {
              this.setState({ userMenuIsVisible: false });
            }}
            onClick={() => {
              this.setState({
                userMenuIsVisible: !this.state.userMenuIsVisible
              });
            }}
          >
            {user.username.length && user.username.length >= 15
              ? user.username.substr(0, 15) + "..."
              : user.username}
            <i className="fa fa-caret-down" />
            {this.state.userMenuIsVisible && (
              <Menu signOut={this.signOut} closeMenu={this.closeMenu} />
            )}
          </h2>
        </nav>
      );

      MobileIsAuthenticatedMenu = (
        <nav
          id="mobile-header-menu"
          className="header-menu mobile-is-authenticated"
        >
          <h2
            className="header-user-name flex center-all"
            onMouseLeave={() => {
              this.setState({ userMenuIsVisible: false });
            }}
            onClick={() => {
              this.setState({
                userMenuIsVisible: !this.state.userMenuIsVisible
              });
            }}
          >
            <div className="text">{user.username}</div>
            <i className="fa fa-user-circle" />
            <i className="fa fa-caret-down" />
            {this.state.userMenuIsVisible && (
              <Menu signOut={this.signOut} closeMenu={this.closeMenu} />
            )}
          </h2>
        </nav>
      );
    }

    const headerClassNames = classNames("header", {
      "dark-header": this.props.location.pathname !== "/"
    });

    return (
      <header styles={HeaderStyles} className={headerClassNames}>
        <h1
          className={`header-site-name ${
            !user.isAuthenticated && !isDesktopViewport
              ? "center-site-name"
              : ""
          }`}
        >
          <Link to="/">{siteName}</Link>
        </h1>

        {isDesktopViewport && (
          <div className="header-right-container flex row">
            {!isDesktopViewport && MobileIsAuthenticatedMenu}
            {isDesktopViewport && IsAuthenticatedMenu}
            {NotAuthenticatedRoutes}
          </div>
        )}
        <div
          className={`header-menu-toggler ${
            menuOpen ? "menu-toggler-fixed" : ""
          } `}
          onClick={this.props.toggleMenu}
        >
          <div className={`toggler ${user.isAuthenticated ? "" : "none"}`}>
            <span className={`${menuOpen ? "background-white" : ""} `} />
            <span className={`${menuOpen ? "background-white" : ""} `} />
            <span className={`${menuOpen ? "background-white" : ""} `} />
            <span className={`${menuOpen ? "background-white" : ""} `} />
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => {
  return {
    menuOpen: state.menuReducers.menuOpen,
    user: state.userReducers
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setLoader: (isLoading, loadingText) =>
      dispatch(setLoader(isLoading, loadingText)),
    toggleMenu: () => dispatch(toggleMenu()),
    signOut: () => dispatch(beginSigningOut())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);
