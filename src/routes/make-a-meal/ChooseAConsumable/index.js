import React, { PropTypes, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Select } from "antd";
import classNames from "classnames";
import SelectAMealMessage from "./SelectAMealMessage";
import FoodDrinksForm from "./FoodDrinksForm";
import AddFirstFoodItem from "./AddFirstFoodItem";
import * as styles from "./styles.scss";

const Option = Select.Option;

const ChooseAConsumable = props => {
  const { foodDrinks } = props;
  const numOfFoodDrinks = foodDrinks && foodDrinks.length;
  const foodDrinksSelectClassNames = classNames(
    "flex",
    "column",
    "align-start",
    { "space-between": numOfFoodDrinks < 1 },
    { "justify-start": numOfFoodDrinks >= 1 }
  );

  const FoodDrinkOptions = foodDrinks.sort().map((foodDrink, index) => {
    return (
      <Option
        className="consumable-option"
        name="consumable-option"
        value={foodDrink._id}
        key={index}
      >
        {foodDrink.name} [{foodDrink.foodOrDrink}] (
        {foodDrink.selectedMeasurement})
      </Option>
    );
  });

  return (
    <section
      className="choose-a-consumable"
      value={props.foodDrinkSelectValue}
      style={styles}
    >
      <div className="consumable flex column space-between align-center">
        <div className={foodDrinksSelectClassNames}>
          <h2>1. Choose a item:</h2>

          <div className="flex align-center select-and-new-consumable-link-container">
            <Select
              key={123}
              id="consumables-select"
              className={`${numOfFoodDrinks < 1 ? "no-margin-right" : ""}`}
              name="consumable-select"
              defaultValue={"Choose"}
              onChange={props.foodDrinkSelectOnChange}
              placeholder="Select a consumable"
            >
              <Option disabled key={123}>
                Choose a consumable
              </Option>
              {FoodDrinkOptions}
            </Select>
            <Link className="add-new-consumable-link" to="/me/add">
              <i className="fa fa-plus"> </i> Add a new item
            </Link>
          </div>

          <AddFirstFoodItem />
        </div>
        {/* {SelectedFoodDrinkForm} */}
        {props.selectedFoodDrink.hasOwnProperty("_id") && (
          <FoodDrinksForm
            selectedFoodDrink={props.selectedFoodDrink}
            selectedMeal={props.selectedMeal}
            servingSizes={props.servingSizes}
            formSubmitted={props.formSubmitted}
            servingSizeOnChange={props.servingSizeOnChange}
            setFormIsSubmitted={props.setFormIsSubmitted}
            handleNumOfServingsOnChange={props.handleNumOfServingsOnChange}
            saveFoodDrinkToMeal={props.saveFoodDrinkToMeal}
          ></FoodDrinksForm>
        )}
        {props.formSubmitted &&
          props.selectedFoodDrink.servingSize !== null &&
          props.selectedFoodDrink.numOfServings !== null &&
          !props.selectedMeal.hasOwnProperty("name") && <SelectAMealMessage />}
      </div>
    </section>
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChooseAConsumable);
