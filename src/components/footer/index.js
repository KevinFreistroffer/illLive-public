import React, { Component } from "react";
import {
  notAuthenticatedRoutes,
  authenticatedRoutes
} from "../../routesConfig";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as FooterStyles from "./styles.scss";

export class Footer extends Component {
  footerRoutes;
  render() {
    const { user } = this.props;
    let routesToMapOver;
    let routes;

    if (user && user.hasOwnProperty("username")) {
      routesToMapOver = authenticatedRoutes;
    } else {
      routesToMapOver = notAuthenticatedRoutes;
    }

    this.footerRoutes =
      user.username !== "" ? authenticatedRoutes : notAuthenticatedRoutes;

    routes = this.footerRoutes.map((route, index) => {
      return (
        <Link to={route.path} key={index + 1}>
          {route.name}
        </Link>
      );
    });

    return (
      <footer style={FooterStyles}>
        <section
          className={`routes ${
            user.username !== ""
              ? "authenticatedRoutes"
              : "notAuthenticatedRoutes"
          }`}
        >
          {routes}
        </section>
        <section className="info flex center-all">
          <ul>
            <li className="have-any-questions">
              Have any questions?&nbsp;&nbsp;
              <Link to="contact-us">
                <br />
                Contact Us
              </Link>
            </li>
            <li className="created-by">
              Created by{" "}
              <a
                href="https://www.upwork.com/fl/kevinfdev"
                target="_blank"
                rel="noopener noreferrer"
              >
                Kevin Freistroffer
              </a>
            </li>
            <li className="copyright">Copyright 2018</li>
          </ul>
        </section>
      </footer>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducers
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer);
