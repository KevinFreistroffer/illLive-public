import {
  BEGIN_CALCULATING_TOTALS,
  CALCULATE_TOTALS,
  CALCULATE_TOTALS_SUCCESS,
  CALCULATE_TOTALS_FAILURE,
  BEGIN_MEAL_ADDITION_CALCULATION,
  MEAL_ADDITION_CALCULATION,
  MEAL_ADDITION_CALCULATION_SUCCESS,
  MEAL_ADDITION_CALCULATION_FAILURE,
} from "./types";

export let beginCalculatingTodaysTotals = () => {
  return function(dispatch) {
    dispatch(calculateTotals());

    return dispatch({
      type: BEGIN_CALCULATING_TOTALS
    });
  }
};

export let calculateTotals = () => {
  // loop over meals.foodDrinks concatinate

  return function(dispatch, getState) { 
    const meals = getState().userReducers.meals;
    const totals = getState().totalsReducers.totals;
    let newTotals = {};

      meals.forEach(meal => {
        meal.foodDrinks.forEach(consumable => {
          // Strip the non vitamin and mineral keys


          // If !newTotals.hasOwnProperty(consumable.key)
          // newTotals[key]: key + totals[key] 
        })
      });

    // const payload = {
    //   vitaminA: 0,
    //   vitaminB1: 0,
    //   vitaminB2: 0,
    //   vitaminB3: 0,
    //   vitaminB5: 0,
    //   vitaminB6: 0,
    //   vitaminB7: 0,
    //   calcium: 0,
    //   choline: 0,
    //   chromium: 0,
    //   copper: 0,
    //   fluoride: 0,
    //   folicAcid: 0,
    //   iodine: 0,
    //   iron: 0,
    //   magnesium: 0,
    //   manganese: 0,
    //   molybdenum: 0,
    //   phosphorus: 0,
    //   potassium: 0,
    //   salt: 0,
    //   vitaminD3: 0,
    //   vitaminE: 0,
    //   vitaminK: 0,
    //   zinc: 0
    // }
    
    return dispatch({
      type: CALCULATE_TOTALS_SUCCESS,
      payload: {
        newTotals
      }
    });
  }
};