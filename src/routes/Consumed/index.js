import React, { Component } from "react";
import { connect } from "react-redux";
import * as ConsumedStyles from "./styles.scss";

export class Consumed extends Component {
  render() {
    return (
      <div className="consumed view" styles={ConsumedStyles}>
        <h1 className="view-title">Consumed</h1>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Consumed);
