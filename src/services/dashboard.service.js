import configs from "../configs";
import axios from "axios";

export const sendSaveFoodDrinkRequest = foodDrink => {
  console.log(`[DashboardService] sendSaveFoodDrinkRequest`, foodDrink);

  return axios(`${configs.apiUrl}/user/add`, {
    method: "post",
    headers: {
      "Content-type": "application/json"
    },
    withCredentials: true,
    data: { foodDrink }
  });
};

// sendSaveMealsRequest
export const sendSaveMealsRequest = (meals) => {
  console.log(`[DashboardService] sendSaveMealsRequest`, meals);
  return axios(`${configs.apiUrl}/user/saveMeals`, {
    method: "post",
    headers: {
      "Content-type": "application/json"
    },
    withCredentials: true,
    data: { meals }
  });
};

export const sendCreateNewMealRequest = (meal) => {
  console.log(`[DashboardService] sendCreateNewMealRequest`, meal);
  return axios(`${configs.apiUrl}/user/createNewMeal`, {
    method: "post",
    headers: {
      "Content-type": "application/json"
    },
    withCredentials: true,
    data: { meal }
  });
};

export const sendSaveMeasurementRequest = (measurement) => {
  return axios(`${configs.apiUrl}/user/saveMeasurement`, { params: { measurement} });
};

export const sendDeleteMeasurementRequest = (measurement) => {
  return axios(`${configs.apiUrl}/user/deleteMeasurement`, { params: { measurement} });
};