import React, { useEffect } from "react";
import { Select } from "antd";

const Option = Select.Option;

export const FoodOrDrink = props => {
  useEffect(() => {
    console.log(props.foodOrDrink);
  }, [props.foodOrDrink]);
  return (
    <>
      <h3 className="stepper-description">Is this a food or a drink item?</h3>
      <div className="stepper-content">
        <Select
          id="measurements-select"
          value={props.foodOrDrink}
          defaultValue="Select a type"
          onChange={props.handleOnChange}
          style={{ width: 200 }}
          placeholder="Select a type"
        >
          <Option key={"2"} value="food">
            Food
          </Option>
          <Option key={"3"} value="drink">
            Drink
          </Option>
        </Select>
      </div>
    </>
  );
};

export default FoodOrDrink;
