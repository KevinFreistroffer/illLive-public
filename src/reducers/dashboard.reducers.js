import {
  BEGIN_SAVING_NEW_MEASUREMENT,
  SUCCESS_SAVING_NEW_MEASUREMENT,
  FAILURE_SAVING_NEW_MEASUREMENT,
  BEGIN_SAVING_NEW_FOOD_DRINK,
  SUCCESS_SAVING_NEW_FOOD_DRINK,
  FAILURE_SAVING_NEW_FOOD_DRINK,
  PUSH_TO_SAVE_FOOD_DRINK_ERRORS,
  FAILURE_SAVING_MEASUREMENT,
  SUCCESS_SAVING_MEASUREMENT,
  BEGIN_DELETING_MEASUREMENT,
  FAILURE_DELETING_MEASUREMENT,
  SUCCESS_DELETING_MEASUREMENT,
  BEGIN_CREATING_NEW_MEAL,
  FAILURE_CREATING_NEW_MEAL,
  SUCCESS_CREATING_NEW_MEAL,
  SAVE_MEASUREMENT_ERROR,
  BEGIN_SAVING_MEALS,
  SUCCESS_SAVING_MEALS,
  FAILURE_SAVING_MEALS
} from "../actions/types";

let initialState = {
	measurements: [],
	successSavingNewFoodDrink: false,
	isSavingNewFoodDrink: false,
	isSavingMeals: false,
	isCreatingNewMeal: false,
	errors: [],
	saveNewFoodDrinkErrors: []
};


export let dashboardReducers = (state = initialState, action) => {
	switch (action.type) {
		case BEGIN_SAVING_NEW_MEASUREMENT:
			return {
				...state
			};

		case SUCCESS_SAVING_NEW_MEASUREMENT:
			return {
				...state,
				measurements: [...state.measurements, action.measurement]
			};

		case FAILURE_SAVING_NEW_MEASUREMENT:
			return {
				...state,
				errors: [...state.errors, action.error]
			};

		case BEGIN_SAVING_NEW_FOOD_DRINK:
			console.log(`dashboardReducer BEGIN_SAVING_NEW_FOOD_DRINK`);
			return {
				...state,
				// ...action.payload
				successSavingNewFoodDrink: false,
				isSavingNewFoodDrink: true
			};

		case SUCCESS_SAVING_NEW_FOOD_DRINK:
			console.log(`SUCCESS_SAVING_NEW_FOOD_DRINK`);
			return {
				...state,
				successSavingNewFoodDrink: true,
				isSavingNewFoodDrink: false
			};

		case FAILURE_SAVING_NEW_FOOD_DRINK:
			console.log(`FAILURE_SAVING_NEW_FOOD_DRINK`, action.payload.errors);
			return {
				...state,
				successSavingNewFoodDrink: false,
				isSavingNewFoodDrink: false,
				saveNewFoodDrinkErrors: [
					...state.saveNewFoodDrinkErrors,
					...action.payload.errors
				]
			};

		case PUSH_TO_SAVE_FOOD_DRINK_ERRORS:
			return {
				...state,
				saveNewFoodDrinkErrors: [
					...state.saveNewFoodDrinkErrors,
					...action.payload.errors
				]
			};

		case BEGIN_SAVING_MEALS:
			return {
				...state,
				isSavingMeals: true
			};

		case SUCCESS_SAVING_MEALS:
			return {
				...state,
				isSavingMeals: false
			};

		case FAILURE_SAVING_MEALS:
			return {
				...state,
				isSavingMeals: false
			};

		case BEGIN_CREATING_NEW_MEAL:
			return {
				...state,
				isCreatingNewMeal: true
			};

		case SUCCESS_CREATING_NEW_MEAL:
			console.log(`SUCCESS_CREATING_NEW_MEAL`);
			return {
				...state,
				isCreatingNewMeal: false
			};

		case FAILURE_CREATING_NEW_MEAL:
			return {
				...state,
				isCreatingNewMeal: false
			};

		default:
			return { ...state };
	}
};
