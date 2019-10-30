import React from "react";
import { Link } from "react-router-dom";

export const Menu = props => {
  // TODO tried connecting to redux and signing out with an action
  // though showed props.signOut is not a function.
  // why?s

  return (
    <div id="header-menu-dropdown" className="">
      <div className="arrow"></div>
      <div
        className="flex column justify-center align-start"
        onClick={() => {
          props.closeMenu();
        }}
      >
        <Link className="menu-item" to="/">
          Home
        </Link>
        <Link className="menu-item" to="/dashboard">
          Dashboard
        </Link>
        <div className="menu-item sign-out" onClick={props.signOut}>
          Sign Out
        </div>
      </div>
    </div>
  );
};
