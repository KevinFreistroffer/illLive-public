import {
  BEGIN_CALCULATING_TOTALS,
  CALCULATE_TOTALS,
  CALCULATE_TOTALS_SUCCESS,
  CALCULATE_TOTALS_FAILURE,
  BEGIN_MEAL_ADDITION_CALCULATION,
  MEAL_ADDITION_CALCULATION,
  MEAL_ADDITION_CALCULATION_SUCCESS,
  MEAL_ADDITION_CALCULATION_FAILURE,
} from "../actions/types";

let initialState = {
	isCalculatingTotals: false,
	totals: {
		vitaminA: 0,
		vitaminB1: 0,
		vitaminB2: 0,
		vitaminB3: 0,
		vitaminB5: 0,
		vitaminB6: 0,
		vitaminB7: 0,
		calcium: 0,
		choline: 0,
		chromium: 0,
		copper: 0,
		fluoride: 0,
		folicAcid: 0,
		iodine: 0,
		iron: 0,
		magnesium: 0,
		manganese: 0,
		molybdenum: 0,
		phosphorus: 0,
		potassium: 0,
		salt: 0,
		vitaminD3: 0,
		vitaminE: 0,
		vitaminK: 0,
		zinc: 0
	}
};


export let totalsReducers = (state = initialState, action) => { 
	switch (action.type) {
		case BEGIN_CALCULATING_TOTALS:
			return {
				...state,
				isCalculatingTotals: true
			}
		case CALCULATE_TOTALS_SUCCESS:
			return {
				...state, 
				// vitaminA: action.payload.vitaminA,
				// vitaminB1: action.payload.vitaminB1,
				// vitaminB2: action.payload.vitaminB2,
				// vitaminB3: action.payload.vitaminB3,
				// vitaminB5: action.payload.vitaminB5,
				// vitaminB6: action.payload.vitaminB6,
				// vitaminB7: action.payload.vitaminB7,
				// calcium: action.payload.calcium,
				// choline: action.payload.choline,
				// chromium: action.payload.chromium,
				// copper: action.payload.copper,
				// fluoride: action.payload.fluoride,
				// folicAcid: action.payload.folicAcid,
				// iodine: action.payload.iodine,
				// iron: action.payload.iron,
				// magnesium: action.payload.magnesium,
				// manganese: action.payload.manganese,
				// molybdenum: action.payload.molybdenum,
				// phosphorus: action.payload.phosphorus,
				// potassium: action.payload.potassium,
				// salt: action.payload.salt,
				// vitaminD3: action.payload.vitaminD3,
				// vitaminE: action.payload.vitaminE,
				// vitaminK: action.payload.vitaminK,
				// zinc: action.payload.zinc,
				isCalculatingTotals: false
			};

		default:
			return {
				...state
			};
	}
};
