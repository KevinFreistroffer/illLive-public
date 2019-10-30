import React, { PropTypes, useEffect } from 'react';
import Meal from './TodaysMeals/Meal';

const TodaysMeals = ({ 
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
    //console.log(selectedMeal, typeof selectedMeal);
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
    <section className="meals">
      <h1 className="section-title">Todays Meals</h1>
      <div className="meals-select-buttons-container flex space-between align-center">
        <div className="meals-select-container">
          <select
            id="meals-select"
            defaultValue={
              (!selectedMeal)
                ? "Choose a meal"
                : selectedMeal._id
            }
            onChange={(event) => {
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
        {selectedMeal && '_id' in selectedMeal && 
         <Meal
          selectedMeal={selectedMeal}
          meal={meals.find(meal => meal._id === selectedMeal._id)}
          mealsLength={meals.length}
          deleteMeal={deleteMeal}
          saveMealName={saveMealName}
          mealNameOnChange={handleMealNameOnChange}
         />
        }
      </div>
      {NoMealsMessage}
		</section>  
  );
};

TodaysMeals.displayName = 'TodaysMeals';

export default TodaysMeals
