import React, { useEffect, PropTypes } from "react";

export const ServingSizeErrorMessage = props => {
  return (
    <div className="consumable-error serving-size-error-message">
      Select a serving size.
    </div>
  );
};

export const NumOfServingsErrorMessage = props => {
  return (
    <div className="consumable-error quantity-error-message">
      Enter the number of servings.
    </div>
  );
};

export const AddButton = props => {
  return (
    <button type="button" className="add" onClick={props.save}>
      Add
    </button>
  );
};

export const FoodDrinksForm = props => {
  return (
    <div
      data-consumable-id={props.selectedFoodDrink._id}
      className={`flex column ${
        props.selectedFoodDrink.foodOrDrink === "food" ? "food" : "drink"
      }`}
    >
      <form className="consumable-form flex column space-around align-center">
        <div className="serving-size">
          <label htmlFor="serving-size-select">
            Serving Size
            <select
              name="serving-size"
              id="serving-size-select"
              defaultValue={props.selectedFoodDrink.servingSize}
              onChange={props.servingSizeOnChange}
            >
              <option disabled>Select a serving size</option>
              {props.servingSizes.map((servingSize, index) => {
                return (
                  <option key={index + 1} value={servingSize}>
                    {servingSize}
                  </option>
                );
              })}
            </select>
            {props.formSubmitted &&
              (!props.selectedFoodDrink.servingSize ||
                props.selectedFoodDrink.servingSize ===
                  "Select a serving size" ||
                props.selectedFoodDrink.servingSize === "") && (
                <ServingSizeErrorMessage />
              )}
          </label>
        </div>

        <div className="quantity">
          <label htmlFor="servings-input">
            How many servings?
            <input
              id="servings-input"
              type="number"
              name="numOfServings"
              value={String(props.selectedFoodDrink.numOfServings)}
              placeholder="3 servings"
              onChange={event => {
                props.setFormIsSubmitted(false);
                props.handleNumOfServingsOnChange(event);
              }}
            />
            {props.formSubmitted &&
              (!props.selectedFoodDrink.numOfServings && (
                <NumOfServingsErrorMessage />
              ))}
          </label>
        </div>

        <AddButton save={props.saveFoodDrinkToMeal}></AddButton>
      </form>
    </div>
  );
};

export default FoodDrinksForm;
