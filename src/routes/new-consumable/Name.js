import React, { useEffect } from "react";
import { Input } from "antd";
import TextField from "@material-ui/core/TextField";

export const FoodDrinkInputName = props => {
  useEffect(() => {
    console.log(props.name);
  }, [props.name]);
  return (
    <>
      <h3 id="step-description">Set your items name</h3>
      <div className="step-content name">
        <TextField
          id="food-drink-name-input"
          label=""
          placeholder="Food or drink name"
          value={props.name}
          onChange={props.handleOnChange}
          margin="normal"
          variant="outlined"
        />
      </div>
    </>
  );
};

export default FoodDrinkInputName;
