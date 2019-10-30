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
} from "./types";
import { beginStoringUser, setUser } from "./user.actions";
import { setAlert } from "./alert.actions";
import uuid from "uuid";
import {
  sendSaveFoodDrinkRequest,
  sendSaveMeasurementRequest,
  sendDeleteMeasurementRequest,
  sendCreateNewMealRequest,
  sendSaveMealsRequest
} from "../services/dashboard.service";

// Saving a measurement
export let beginSavingMeasurement = () => {
  return {
    type: BEGIN_SAVING_NEW_MEASUREMENT,
    payload: {
      isSavingMeasurement: true
    }
  };
};

export let saveMeasurement = measurement => {
  return function(dispatch, getState) {
    dispatch(beginSavingMeasurement());

    sendSaveMeasurementRequest(measurement)
      .then(res => {
        if (!res.success) {
        } else {
          dispatch(successSavingMeasurement());
        }
      })
      .catch(error => {
        // simply, if there's an error, store the adjective in localStorage todoSaves and keep
        // trying to save them and on sucessfull save, delete localStorage item.
        dispatch(failureSavingMeasurement(measurement, error));
      });
  };
};

export let successSavingMeasurement = measurement => {
  return {
    type: SUCCESS_SAVING_NEW_MEASUREMENT,
    payload: {
      measurement,
      isSavingMeasurement: false
    }
  };
};

export let failureSavingMeasurement = (measurement, error) => {
  let saveMeasurementErrors;
  let measurementErrors = {
    type: FAILURE_SAVING_NEW_MEASUREMENT,
    measurement,
    error,
    id: uuid(),
    message: "Oh, there was an error. Please try SAVING the measurement again."
  };

  let serializedMeasurementError = JSON.stringify(error);

  try {
    saveMeasurementErrors = JSON.parse(
      localStorage.getItem("saveMeasurementErrors")
    );
  } catch (error) {
    console.log(
      `An error occured parsing localStorage saveMeasurementErrors item`,
      error
    );
  }

  if (saveMeasurementErrors === null) {
    try {
      localStorage.setItem(
        `saveMeasurementErrors`,
        JSON.stringify([serializedMeasurementError])
      );
    } catch (error) {
      console.log(`An error occured setting saveMeasurementErrors`, error);
    }
  } else {
    saveMeasurementErrors.push(serializedMeasurementError);

    try {
      localStorage.setItem(
        `saveMeasurementErrors`,
        JSON.stringify(saveMeasurementErrors)
      );
    } catch (error) {
      console.log(`An error occured setting saveMeasurementErrors`, error);
    }
  }

  return {
    type: FAILURE_SAVING_NEW_MEASUREMENT,
    error: measurementErrors
  };
};

// Add new measurement
// TODO a measurement is added to the users measurements[] ?
export let beginSavingNewMeasurement = () => {
  return function(dispatch) {
    return {
      type: BEGIN_SAVING_NEW_MEASUREMENT,
      payload: {
        isSAVINGNewMeasurement: true
      }
    };
  };
};

export let addNewMeasurement = adjective => {};

export let successSavingNewMeasurement = () => {
  return function(dispatch) {
    return {
      type: SUCCESS_SAVING_NEW_MEASUREMENT,
      payload: {
        isSAVINGNewMeasurment: false
      }
    };
  };
};

export let failureSavingNewMeasurment = () => {
  return {
    type: FAILURE_SAVING_NEW_MEASUREMENT,
    payload: {
      isSAVINGNewMeasurement: false
    }
  };
};

// Delete measurement
export let beginDeletingMeasurement = () => {
  return {
    type: BEGIN_DELETING_MEASUREMENT,
    payload: {
      isDeletingMeasurement: true
    }
  };
};

export let deleteMeasurement = (measurement, index) => {
  return function(dispatch, getState) {
    let user = getState().userReducers;
    let measurements = user.measurements;

    sendDeleteMeasurementRequest()
      .then(res => {
        if (!res.success) {
          dispatch(failureDeletingMeasurement(res.data.error));
        } else {
          let newMeasurements = measurements.filter((_measurement, index) => {
            return _measurement.toUpperCase() === measurement.toUpperCase();
          });
          dispatch(
            successDeletingMeasurement(Object.assign({}, user, newMeasurements))
          );
        }
      })
      .catch(error => {
        dispatch(failureDeletingMeasurement(error));
      });
  };
};

export let successDeletingMeasurement = user => {
  return {
    type: SUCCESS_DELETING_MEASUREMENT,
    payload: {
      isDeletingMeasurement: false,
      user
    }
  };
};

export let failureDeletingMeasurement = () => {
  return {
    type: FAILURE_DELETING_MEASUREMENT,
    payload: {
      isDeletingMeasurement: false
    }
  };
};

// Add a food or drink item
export let beginSavingNewFoodDrink = foodDrink => {
  console.log(`[dashboardActions] beginSavingNewFoodDrink`);
  return function(dispatch) {
    dispatch(saveNewFoodDrink(foodDrink));

    return dispatch({
      type: BEGIN_SAVING_NEW_FOOD_DRINK
    });
  };
};

export let saveNewFoodDrink = foodDrink => {
  return function(dispatch) {
    sendSaveFoodDrinkRequest(foodDrink)
      .then(response => {
        // TODO
        // If the item already exists
        // 1. check current getStore() for existing item name trim etc.
        // 2. If already exists, tell user to add a new measurement for that item
        // 3 Otherwise save item.
        console.log(`response from sendSaveFoodDrinkRequest`, response);
        if (response.status === 200) {
          dispatch(successSavingNewFoodDrink(response.data.data.savedUser));
        } else {
          dispatch(failureSavingNewFoodDrink());
        }
      })
      .catch(error => {
        console.log(`[Add -> saveFoodDrink] An error occured`, error);
      });
  };
};

export let successSavingNewFoodDrink = user => {
  return function(dispatch) {
    dispatch(setAlert(true, "Item added!", "", "success"));
    dispatch(setUser(user));

    setTimeout(() => {
      dispatch(setAlert(false, ""));
    }, 2800);

    return dispatch({
      type: SUCCESS_SAVING_NEW_FOOD_DRINK
    });
  };
};

export let failureSavingNewFoodDrink = errors => {
  return {
    type: FAILURE_SAVING_NEW_FOOD_DRINK,
    payload: {
      errors
    }
  };
};

// Create a new meal
export let beginCreatingNewMeal = meal => {
  console.log(`beginCreatingNewMeal meal`, meal);
  return function(dispatch) {
    dispatch(createNewMeal(meal));

    return dispatch({
      type: BEGIN_CREATING_NEW_MEAL
    });
  };
};

export let createNewMeal = meal => {
  return function(dispatch) {
    sendCreateNewMealRequest(meal)
      .then(response => {
        // TODO
        // If the item already exists
        // 1. check current getStore() for existing item name trim etc.
        // 2. If already exists, tell user to add a new measurement for that item
        // 3 Otherwise save item.
        console.log(`response from sendSaveFoodDrinkRequest`, response);
        if (response.status === 200) {
          dispatch(successCreatingNewMeal(response.data.data));
        } else {
          dispatch(failureCreatingNewMeal(response.dashboardActions));
        }
      })
      .catch(error => {
        console.log(`[Add -> saveFoodDrink] An error occured`, error);
      });
  };
};

export let successCreatingNewMeal = user => {
  console.log(`successCreatingNewMeal`);
  return function(dispatch) {
    dispatch(beginStoringUser(user));

    return dispatch({
      type: SUCCESS_CREATING_NEW_MEAL
    });
  };
};

export let failureCreatingNewMeal = errors => {
  return {
    type: FAILURE_CREATING_NEW_MEAL,
    payload: {
      errors
    }
  };
};


// Save meals
export let beginSavingMeals = meals => {
  return function(dispatch) {
    dispatch(saveMeals(meals));

    return dispatch({
      type: BEGIN_SAVING_MEALS
    });
  };
};

export let saveMeals = meals => {
  return async function(dispatch) {
    const response = await sendSaveMealsRequest(meals);

    console.log(response);
    if (response.status === 200) {
      dispatch(successSavingMeals(response.data.data));
    } else {
      dispatch(failureSavingMeals(response.data.data));
    }

  };
};

export let successSavingMeals = user => {
  return function(dispatch) {
    console.log(`successSavingMeals`, user);
    dispatch(setUser(user));

    return dispatch({
      type: SUCCESS_SAVING_MEALS
    });
  };
};

export let failureSavingMeals = errors => {
  return {
    type: FAILURE_SAVING_MEALS,
    payload: {
      errors
    }
  };
};

// TODO this isn't real. 
export let pushToSaveFoodDrinkErrors = errors => {
  return {
    type: FAILURE_SAVING_NEW_FOOD_DRINK,
    payload: {
      errors
    }
  }
}

