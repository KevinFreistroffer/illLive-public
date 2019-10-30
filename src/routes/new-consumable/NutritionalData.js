import React, { Component, useEffect } from "react";
import { Input } from "antd";
import TextField from "@material-ui/core/TextField";
import classNames from "classnames";

export class NutritionalData extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props);
  }

  goBack = () => {
    console.log(`goBack`);
    this.props.goBack();
  };
  clearForm = () => {
    this.props.clearInnerForm();
  };
  save = () => {
    this.props.save();
  };

  render() {
    return (
      <>
        <h3 className="step-description">
          The number of calories, vitamins and minerals.
        </h3>
        <div className="step-content nutritional-data flex row justify-start align-center wrap">
          {/* <button type="button" className="compare-to-rda">
            <img src="https://img.icons8.com/ios/50/000000/health-graph.png" />
            Calculate RDA %
          </button>
          <button className="clear-form-button">Clear all values</button> */}
          <div className="wrap flex justify-start">
            <div className="input calorie-input">
              <TextField
                type="number"
                name="calories"
                label="Calories"
                value={this.props.state.calories}
                className="add-form-input"
                onChange={event => {
                  this.props.handleOnChange(event);
                }}
                id="calories"
                margin="normal"
                variant="outlined"
              />
            </div>
            {this.props.vitaminsJSON.default.vitamins.map((vitamin, index) => {
              if (vitamin.name === "manganese") console.log(vitamin);
              // TODO: rename vitamin as form-control or use Material UI
              return (
                <div className="input" key={index}>
                  <TextField
                    label={vitamin.name}
                    type="number"
                    name={vitamin.inputName}
                    value={
                      this.props.state[vitamin.inputName] === 0
                        ? 0
                        : this.props.state[vitamin.inputName]
                    }
                    className="add-form-input"
                    onChange={event => {
                      this.props.handleOnChange(event);
                    }}
                    id={vitamin.id}
                    margin="normal"
                    variant="outlined"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

export default NutritionalData;
