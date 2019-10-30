import React, { PropTypes, useEffect } from "react";
import Meal from "./Meal";
import * as styles from "./styles.scss";

const MyMeals = ({
  meals,
  selectedMeal,
  createNewMeal,
  saveMeals,
  deleteMeal,
  saveMealName,
  handleMealNameOnChange,
  handleMealSelectOnChange
}) => {
  // MealsOptions
  let SelectedMeal;
  let MealsOptions;
  let NoMealsMessage;

  useEffect(() => {
    console.log("selectedMeal", selectedMeal, typeof selectedMeal);
  });

  if (meals && meals.length) {
    MealsOptions = meals.map((meal, index) => {
      return (
        <option key={index + 1} value={meal._id}>
          {meal.name}
        </option>
      );
    });
  }

  if (!meals || !meals.length) {
    NoMealsMessage = (
      <div className="no-meals-text">No meals created today.</div>
    );
  }

  return (
    <section className="my-meals" style={styles}>
      <h2 className="section-title">2. Make a meal</h2>
      <div className="meals-select-buttons-container flex space-between align-center">
        <div className="meals-select-container">
          <select
            id="meals-select"
            defaultValue={
              selectedMeal.hasOwnProperty("_id")
                ? selectedMeal._id
                : "Pick a meal"
            }
            onChange={event => {
              handleMealSelectOnChange(event);
            }}
          >
            <option disabled value="Choose a meal">
              Choose a meal
            </option>
            {MealsOptions}
          </select>
        </div>
        <div className="buttons flex space-around align-center">
          <button
            type="button"
            className="new-meal"
            onClick={() => createNewMeal()}
          >
            New meal
          </button>
          <button
            type="button"
            className="save-meals"
            onClick={() => saveMeals()}
          >
            Save my meals
          </button>
        </div>
      </div>
      <div className="meals-container">
        {selectedMeal && selectedMeal.hasOwnProperty("_id") && (
          <Meal
            selectedMeal={selectedMeal}
            meal={meals.find(meal => meal._id === selectedMeal._id)}
            mealsLength={meals.length}
            deleteMeal={deleteMeal}
            saveMealName={saveMealName}
            mealNameOnChange={handleMealNameOnChange}
          />
        )}
      </div>
      {NoMealsMessage}
    </section>
  );
};

MyMeals.displayName = "SeeTheMeals";

export default MyMeals;
