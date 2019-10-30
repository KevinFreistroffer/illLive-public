import React, { useState, useEffect } from "react";
import * as styles from "./styles.scss";
import Leaf from "./leaf.jpg";

export const Home = props => {
  return (
    <div className="home view" styles={styles}>
      <div id="home-overlay" className="view-overlay">
        <section className="welcome">
          <h1>
            <span>24 Hour</span> Vitamin Tracking
          </h1>
          <div className="welcome-buttons">
            <button
              className="signup-button"
              type="button"
              onClick={() => props.history.push("/register")}
            >
              Sign Up
            </button>
            <button
              className="signin-button"
              type="button"
              onClick={() => props.history.push("/signin")}
            >
              Sign In
            </button>
          </div>
        </section>
        <section className="mobile-version">
          <h1>Mobile version coming soon!</h1>
        </section>
      </div>
    </div>
  );
};

export default Home;
