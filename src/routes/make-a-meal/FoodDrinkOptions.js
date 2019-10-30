import React, { PropTypes } from "react";
import { connect } from "react-redux";

const FoodDrinkOptions = props => {
  return (
    <option
      className="consumable-option"
      name="consumable-option"
      value={props.foodDrink._id}
      key={props.index}
    >
      {props.foodDrink.name} [{props.foodDrink.foodOrDrink}] (
      {props.foodDrink.selectedMeasurement})
    </option>
  );
};

const mapStateToProps = state => {
  return {
    user: state.userReducers
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default (mapStateToProps, mapDispatchToProps)(FoodDrinkOptions);
