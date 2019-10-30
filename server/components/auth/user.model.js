const express = require('express');
const mongoose = require('mongoose');

// Schemas
const VitaminSchema = mongoose.Schema({
  // Commented these out to see if findAndUpdate will work
  // name: { type: String, required: true},
  // rda: { type: String, required: true},
  // measurement: { type: String, required: true}
  name: String,
  rda: String,
  measurement: String
});


const FoodDrinkSchema = mongoose.Schema({
  name: { type: String, required: true},
  foodOrDrink: { type: String, required: true }, // TODO maybe rename foodOrDrink
  calories: { type: Number },
  measurements: {type: [String], required: true }, // cup, quart, teaspoon
  selectedMeasurement: { type: String, required: true }, // TODO should be selectedMeasurement
  // TODO needs to be added selectedMeasurement: { type: String, required: true },
  selectedMeasurement: String,
  vitaminA: mongoose.Schema.Types.Mixed,
  vitaminB1: mongoose.Schema.Types.Mixed,
  vitaminB2: mongoose.Schema.Types.Mixed,
  vitaminB3: mongoose.Schema.Types.Mixed,
  vitaminB5: mongoose.Schema.Types.Mixed,
  vitaminB6: mongoose.Schema.Types.Mixed,
  vitaminB7: mongoose.Schema.Types.Mixed,
  vitaminB12: mongoose.Schema.Types.Mixed,
  calcium: mongoose.Schema.Types.Mixed,
  choline: mongoose.Schema.Types.Mixed,
  chromium: mongoose.Schema.Types.Mixed,
  copper: mongoose.Schema.Types.Mixed,
  flouride: mongoose.Schema.Types.Mixed,
  folicAcid: mongoose.Schema.Types.Mixed,
  iodine: mongoose.Schema.Types.Mixed,
  iron: mongoose.Schema.Types.Mixed,
  magnesium: mongoose.Schema.Types.Mixed,
  manganese: mongoose.Schema.Types.Mixed,
  molybdenum: mongoose.Schema.Types.Mixed,
  phosphorus: mongoose.Schema.Types.Mixed,
  potassium: mongoose.Schema.Types.Mixed,
  selenium: mongoose.Schema.Types.Mixed,
  salt: mongoose.Schema.Types.Mixed,
  vitaminD3: mongoose.Schema.Types.Mixed,
  vitaminE: mongoose.Schema.Types.Mixed,
  vitaminK: mongoose.Schema.Types.Mixed,
  zinc: mongoose.Schema.Types.Mixed
});

const FoodDrinkInMealSchema = mongoose.Schema({
  name: { type: String, required: true},
  foodOrDrink: { type: String, required: true }, // TODO maybe rename foodOrDrink
  measurements: {type: [String], required: true }, // cup, quart, teaspoon
  selectedMeasurement: { type: String, required: true }, // TODO should be selectedMeasurement
  servingSize: { type: String, required: true },
  numOfServings: { type: Number, required: true },
  calories: { type: Number },
  vitaminA: mongoose.Schema.Types.Mixed,
  vitaminB1: mongoose.Schema.Types.Mixed,
  vitaminB2: mongoose.Schema.Types.Mixed,
  vitaminB3: mongoose.Schema.Types.Mixed,
  vitaminB5: mongoose.Schema.Types.Mixed,
  vitaminB6: mongoose.Schema.Types.Mixed,
  vitaminB7: mongoose.Schema.Types.Mixed,
  vitaminB12: mongoose.Schema.Types.Mixed,
  calcium: mongoose.Schema.Types.Mixed,
  choline: mongoose.Schema.Types.Mixed,
  chromium: mongoose.Schema.Types.Mixed,
  copper: mongoose.Schema.Types.Mixed,
  flouride: mongoose.Schema.Types.Mixed,
  folicAcid: mongoose.Schema.Types.Mixed,
  iodine: mongoose.Schema.Types.Mixed,
  iron: mongoose.Schema.Types.Mixed,
  magnesium: mongoose.Schema.Types.Mixed,
  manganese: mongoose.Schema.Types.Mixed,
  molybdenum: mongoose.Schema.Types.Mixed,
  phosphorus: mongoose.Schema.Types.Mixed,
  potassium: mongoose.Schema.Types.Mixed,
  selenium: mongoose.Schema.Types.Mixed,
  salt: mongoose.Schema.Types.Mixed,
  vitaminD3: mongoose.Schema.Types.Mixed,
  vitaminE: mongoose.Schema.Types.Mixed,
  vitaminK: mongoose.Schema.Types.Mixed,
  zinc: mongoose.Schema.Types.Mixed
});

const ItemVitaminSchema = mongoose.Schema({
  name: String,
  value: Number
});

const MealsSchema = mongoose.Schema({
  id: { type: Number, required: true},
  name: { type: String, required: true },
  foodDrinks: [FoodDrinkInMealSchema],
});


const UserSchema = mongoose.Schema({
  username: { type: String, required: true},
  email: { type: String, required: true},
  password: { type: String, required: true},
  confirmAccountToken: { type: String, required: true},
  accountConfirmed: { type: Boolean, required: true },
  // confirmedCookie: { type: Boolean, required: true },
  measurements: { type: [String], required: true },
  confirmed24HourMealResetMessage: Boolean,
  foodDrinks: [FoodDrinkSchema],
  meals: [MealsSchema], 
  vitamins: [VitaminSchema]
});


// Models
const Vitamin = mongoose.model("Vitamin", VitaminSchema);
const FoodDrink = mongoose.model("Item", FoodDrinkSchema); // Rename to FoodDrink
const User = mongoose.model("User", UserSchema);
const Meal = mongoose.model("Meal", MealsSchema);

module.exports = User;
