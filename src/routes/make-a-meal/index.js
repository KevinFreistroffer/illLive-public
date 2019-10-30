import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames";
import moment from "moment";
import momentz from "moment-timezone";
import * as MakeAMealStyles from "./styles.scss";
import { setAlert } from "../../actions/alert.actions";
import {
  setUser,
  beginConfirm24HourMealResetMessage
} from "../../actions/user.actions";
import {
  beginCreatingNewMeal,
  beginSavingMeals
} from "../../actions/dashboard.actions";
import { calculateTotals } from "../../actions/totals.actions";
import { setLoader } from "../../actions/loading.actions";
import { sendSaveMealsRequest } from "../../services/dashboard.service";
import * as LocalStorage from "../../utilities/localStorage";
import ViewHeader from "../../components/ViewHeader";
import Detail from "./Detail";
import ChooseAConsumable from "./ChooseAConsumable";
import MyMeals from "./MyMeals";
import ErrorBoundary from "../../components/ErrorBoundary";
import Confirm24HourMealResetMessage from "./Confirm24HourMealResetMessage";
import Clock from "react-live-clock";
import { Select, Option } from "antd";

const DetailStyles = {
  position: "absolute"
};

export class MakeAMeal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "Make a meal",
      date: "",
      timezoneGuess: "",
      showDetailModal: false,
      servingSizes: ["1", "3/4", "1/2", "1/3", "1/4", "1/8", "1/16", "1/32"],
      newMeasurement: "",
      selectedFoodDrink: {
        numOfServings: 0,
        servingSize: "Select a serving size",
        measurement: ""
      },
      meals: [],
      selectedMeal: {},
      mealName: "",
      showMealNameInput: false,
      foodDrinkSelectValue: "Choose",
      formSubmitted: false,
      showSelectAMealMessage: false
    };

    this.quantityRef = React.createRef();

    document.title = "Make a Meal";
  }

  componentDidMount() {
    console.log(`componentDidMount`);
    const { date, timezoneGuess } = this.getDateAndTimeZone();
    let meals;
    let selectedMeal;
    let mealsFromLocalStorage;
    let selectedMealFromLocalStorage;

    console.log(`this.props.user`, this.props.user);

    if (this.props.user.isAuthenticated) {
      if (this.props.user.meals && this.props.user.meals.length === 1) {
        console.log(
          `this.props.user.meals && this.props.user.meals.length === 1`
        );
        this.setState({
          selectedMeal: { ...this.props.user.meals[0] }
        });
      }

      try {
        mealsFromLocalStorage = LocalStorage.getItem("meals");
        if (!mealsFromLocalStorage) {
          meals = this.props.user.meals;
        } else if (mealsFromLocalStorage && mealsFromLocalStorage.length) {
          meals = mealsFromLocalStorage;
        }
      } catch (error) {
        console.warn(
          `An error occured calling localStorage.getItem('meals')`,
          error
        );

        meals = this.props.user.meals;
      }

      try {
        selectedMealFromLocalStorage = LocalStorage.getItem("selectedMeal");
        selectedMeal = !selectedMealFromLocalStorage
          ? this.state.selectedMeal
          : selectedMealFromLocalStorage;
      } catch (error) {
        console.log(
          `An error occured calling localStorage.getItem('selectedMeal')`,
          error
        );
        selectedMeal = this.state.selectedMeal;
      }

      this.setState({
        date,
        timezoneGuess,
        meals: [...meals],
        selectedMeal: Object.assign({}, this.state.selectedMeal, selectedMeal)
      });
    } else {
      this.setState({
        date,
        timezoneGuess
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let meals;
    let selectedMeal;
    let mealsFromLocalStorage;
    let selectedMealFromLocalStorage;

    if (this.props.user.isAuthenticated) {
      if (prevProps.isCreatingNewMeal && !this.props.isCreatingNewMeal) {
        this.props.setLoader(false);
      }

      console.log(prevProps.user, this.props.user);
      if (
        prevProps.user.meals &&
        !prevProps.user.meals.length &&
        this.props.user.meals.length === 1
      ) {
        console.log(`props.user.meals.length === 1`);
        this.setState({
          selectedMeal: { ...this.props.user.meals[0] }
        });
      }

      // Handle saving meals
      if (prevProps.isSavingMeals && !this.props.isSavingMeals) {
        LocalStorage.updateLocalStorage("meals", this.props.user.meals);
        if (LocalStorage.isInLocalStorage("selectedMeal")) {
          let selectedMeal = LocalStorage.getItem("selectedMeal");
          if (selectedMeal) {
            LocalStorage.updateLocalStorage(
              "selectedMeal",
              this.props.user.meals.filter(meal => {
                if (selectedMeal._id) {
                  return meal._id === selectedMeal._id;
                } else {
                  return meal.id === selectedMeal.id;
                }
              })
            );
          }
        }
      }

      if (!prevState.selectedMeal && this.state.selectedMeal) {
        console.log(this.state.selectedMeal);
      }
    }

    // Handles if /make-a-meal is refreshed
    if (!prevProps.user.isAuthenticated && this.props.user.isAuthenticated) {
      if (this.props.user.meals && this.props.user.meals.length === 1) {
        console.log(`props.user.meals.length === 1`);
        this.setState({
          selectedMeal: { ...this.props.user.meals[0] }
        });
      }
      // try {
      //   mealsFromLocalStorage = LocalStorage.getItem("meals");
      //   if (!mealsFromLocalStorage) {
      //     meals = this.props.user.meals;
      //   } else if (mealsFromLocalStorage && mealsFromLocalStorage.length) {
      //     meals = mealsFromLocalStorage;
      //   }
      // } catch (error) {
      //   console.warn(
      //     `An error occured calling localStorage.getItem('meals')`,
      //     error
      //   );

      //   meals = this.props.user.meals;
      // }

      // try {
      //   selectedMealFromLocalStorage = LocalStorage.getItem("selectedMeal");
      //   selectedMeal = !selectedMealFromLocalStorage
      //     ? this.state.selectedMeal
      //     : selectedMealFromLocalStorage;
      // } catch (error) {
      //   console.log(
      //     `An error occured calling localStorage.getItem('selectedMeal')`,
      //     error
      //   );
      //   selectedMeal = this.state.selectedMeal;
      // }

      // SElected meal was the original thing. So meals is equal to meals
    }
  }

  getDateAndTimeZone = () => {
    let dateObj = new Date();
    const momentDateObj = moment(dateObj);
    const month = momentDateObj.format("MMMM");
    const day = momentDateObj.format("DD");
    const year = momentDateObj.format("YYYY");
    const date = `${month} ${day}, ${year}`;
    const timezoneGuess = momentz.tz.guess();

    return { date, timezoneGuess };
  };

  createNewMeal = (foodDrink = {}) => {
    const { selectedFoodDrink } = this.state;
    const { meals } = this.props.user;
    let foodDrinkObjectIsNotEmpty = false;

    // Is the meal created with a foodDrink object ie { servingSize, numOfServingsetc. }
    for (let key in foodDrink) {
      if (foodDrink.hasOwnProperty(key)) {
        foodDrinkObjectIsNotEmpty = true;
        foodDrink.numOfServings = selectedFoodDrink.numOfServings;
      }
    }

    const idAndMealNumber =
      !meals.length || meals.length === 0 ? 1 : meals.length + 1;

    const newMeal = {
      id: idAndMealNumber,
      name: `Meal-${idAndMealNumber}`,
      foodDrinks: foodDrinkObjectIsNotEmpty ? [foodDrink] : [],
      saved: false // not necessary
    };

    this.props.beginCreatingNewMeal(newMeal);
  };

  addConsumableToMeal = () => {
    const { selectedMeal, selectedFoodDrink } = this.state;
    const { meals } = this.props.user;
    const { numOfServings, servingSize } = selectedFoodDrink;
    //let mealsToUpdate = meals;
    let mealsToUpdate = meals;
    let foodDrinkToUpdate = { ...selectedFoodDrink };
    let isSameMeasurement; // isSameMeasurement maybe?
    let foodDrinkIndex;
    let foodDrinkIsAlreadyIncluded;
    let mealToUpdate = { ...selectedMeal };
    let mealToUpdateIndex;
    let userHasMealsToday = meals && meals.length >= 1;
    let noMealHasBeenSelected =
      !selectedMeal || !selectedMeal.hasOwnProperty("id");

    if (!userHasMealsToday) {
      this.createNewMeal(selectedFoodDrink);
    } else if (userHasMealsToday && noMealHasBeenSelected) {
      this.setState({ showSelectAMealMessage: true });
    } else {
      mealToUpdateIndex = meals.findIndex(meal => meal.id === selectedMeal.id);

      foodDrinkIsAlreadyIncluded = this.foodDrinkAlreadyIncluded(
        foodDrinkToUpdate
      );
      isSameMeasurement = this.foodDrinksAreSameMeasurement(foodDrinkToUpdate);

      if (
        !foodDrinkIsAlreadyIncluded ||
        (foodDrinkIsAlreadyIncluded && !isSameMeasurement)
      ) {
        // Because it's a new measurement of that foodDrink,
        // add it to this meal.
        mealToUpdate.foodDrinks.push(foodDrinkToUpdate);
      } else if (foodDrinkIsAlreadyIncluded && isSameMeasurement) {
        // Then just increment the number of servings
        foodDrinkIndex = mealToUpdate.foodDrinks.findIndex(foodDrink => {
          return (
            foodDrink._id === selectedFoodDrink._id &&
            foodDrink.servingSize === selectedFoodDrink.servingSize
          );
        });

        mealToUpdate.foodDrinks[foodDrinkIndex].numOfServings += parseFloat(
          numOfServings
        );
      }

      mealsToUpdate[mealToUpdateIndex] = mealToUpdate;

      // axios.post('/updateMeal', { id, meal });
      // Database User.find({_id, meal.id: meal})
      // On success actions setUser();

      this.setState({
        meals: mealsToUpdate,
        selectedMeal: Object.assign({}, this.state.selectedMeal, mealToUpdate),
        formSubmitted: false,
        selectedFoodDrink: Object.assign(this.state.selectedFoodDrink, {
          numOfServings: 0,
          servingSize: "Select a serving size",
          measurement: ""
        })
      });
    }
  };

  deleteMeal = mealId => {
    const { meals } = this.state;
    let filteredMeals;

    if (this.props.user.meals.length === 1) {
      filteredMeals = [];
    } else {
      console.log(meals);
      filteredMeals = meals.filter(meal => meal.id !== mealId);
    }

    this.setState(
      {
        meals: [...filteredMeals],
        selectedMeal: filteredMeals.length
          ? filteredMeals[filteredMeals.length - 1]
          : { id: "Choose a meal" }
      },
      () => {
        console.log(this.props.user.meals);
        if (this.props.user.meals.length === 0) {
          LocalStorage.clearLocalStorage();
        } else {
          LocalStorage.addToLocalStorage("meals", this.props.user.meals);
        }
      }
    );
  };

  foodDrinkAlreadyIncluded = foodDrink => {
    const { selectedMeal } = this.state;
    let existingFoodDrink;

    if (
      selectedMeal &&
      selectedMeal.hasOwnProperty("foodDrinks") &&
      selectedMeal.foodDrinks.length
    ) {
      existingFoodDrink = selectedMeal.foodDrinks.some((_foodDrink, index) => {
        return _foodDrink._id === foodDrink._id;
      });
    }

    return existingFoodDrink;
  };

  foodDrinksAreSameMeasurement = foodDrink => {
    const { selectedMeal } = this.state;
    let sameServingSize;

    if (
      selectedMeal &&
      selectedMeal.hasOwnProperty("foodDrinks") &&
      selectedMeal.foodDrinks.length
    ) {
      sameServingSize = selectedMeal.foodDrinks.some((_foodDrink, index) => {
        return _foodDrink.servingSize === foodDrink.servingSize;
      });
    }

    return sameServingSize;
  };

  saveMeals = () => {
    // TODO async await
    this.props.beginSavingMeals(this.props.user.meals);
    //     sendSaveMealsRequest(this.props.user.meals)
    //       .then((response) => {
    //         console.log(`MakeAMeal() response`, response, response.data.data.user);
    //
    //         if (response.status === 200) {
    //           console.log(response.data.data);
    //           this.props.setUser(response.data.data.user);
    //           LocalStorage.addToLocalStorage('meals', this.props.user.meals);
    //           LocalStorage.removeFromLocalStorage(['selectedMeal']);
    //           this.props.setAlert(true, "Saved meals!");
    //
    //           setTimeout(() => {this.props.setAlert(false)}, 3000);
    //
    //           this.props.calculateTotals();
    //         }
    //         // HTTP request
    //         // On success LocalStorage.setItem()
    //       })
    //       .catch(error => {
    //         console.log(`An error occured setting a meal`, error);
    //       });
  };

  setSelectedMeal = selectedMeal => {
    this.setState(
      {
        selectedMeal: Object.assign({}, this.state.selectedMeal, selectedMeal)
      },
      () =>
        LocalStorage.addToLocalStorage("selectedMeal", this.state.selectedMeal)
    );
  };

  makeAMealName = (name, id) => {
    console.log(`makeAMealName`, name, id);
    const { meals, selectedMeal } = this.state;
    let selectedMealIndex;
    let newMealsState = this.props.user.meals;

    meals.find((meal, index) => {
      if (meal.id === selectedMeal.id) {
        newMealsState[index]["name"] = name;

        this.setState(
          {
            meals: [newMealsState],
            mealName: ""
          },
          () => LocalStorage.addToLocalStorage("meals", this.props.user.meals)
        );
      } else {
        return undefined;
      }
    });
  };

  addNewMeasurement = id => {
    console.log(`[MakeAMeal addNewMeasurement(id)]`, id);
    // find consumable.id.measurements.push(this.state.newMeasurement);
    // update LocalStorage
    // update user object Redux
    // something about if an existing newMeasurement is toggledOpen in another different
    // food item than close it and clear its input
  };

  toggleMealNameInput = value => {
    console.log(`[MakeAMeal] toggleMealNameInput()`);
    this.setState({ showMealNameInput: value === "open" ? true : false });
  };

  saveMealName = () => {
    console.log(`[MakeAMeal -> saveMealName()]`);
    const { selectedMeal, mealName, meals } = this.state;

    let foundMeal = meals.find(meal => meal.id === selectedMeal.id);
    foundMeal.name = mealName;

    this.setState(
      {
        meals: meals.map(meal =>
          meal.id === selectedMeal.id ? { ...meal, name: mealName } : meal
        ),
        selectedMeal: Object.assign({}, this.state.selectedMeal, foundMeal)
      },
      () => {
        console.log(this.props.user.meals);
        LocalStorage.addToLocalStorage("meals", this.props.user.meals);
      }
    );
  };

  setFormSubmitted = formSubmitted => {
    this.setState({ formSubmitted });
  };

  saveFoodDrinkToMeal = () => {
    const { selectedFoodDrink } = this.state;
    const { servingSize, numOfServings } = selectedFoodDrink;
    const foodFormIsValid = this.isFoodFormValid();

    this.setFormSubmitted(true);

    if (foodFormIsValid) {
      if (
        servingSize !== "" &&
        servingSize !== "Select a serving size" &&
        numOfServings &&
        numOfServings !== ""
      ) {
        this.addConsumableToMeal();
      }
    }
  };

  handleOnCloseDetail = () => {
    this.setState({ showDetailModal: false });
  };

  isFoodFormValid = () => {
    const { servingSize, numOfServings } = this.state.selectedFoodDrink;
    return (
      servingSize !== "" &&
      servingSize !== "Select a serving size" &&
      numOfServings
    );
  };

  // ------------ OnChange -----------
  handleMealNameOnChange = (name = "") => {
    this.setState({
      mealName: name.trim()
    });
  };

  handleFoodDrinkSelectOnChange = id => {
    const { user } = this.props;
    const { foodDrinks } = user;

    let foundFoodDrink = foodDrinks.find(item => item._id === id);

    if (foodDrinks && foodDrinks.length && foundFoodDrink) {
      this.setState({
        formSubmitted: false,
        selectedFoodDrink: {
          ...this.state.selectedFoodDrink,
          ...foundFoodDrink,
          servingSize: "Select a serving size",
          measurement: foundFoodDrink.selectedMeasurement,
          numOfServings: ""
        }
      });
    }
  };

  handleNewMeasurementOnChange = event => {
    // something about if another food newMeasurement input is populated
    // than clear it and close the input
    // and this input is not sanitized. should it be sanitized trim() etc.?
    this.setState({ newMeasurement: event.target.value });
  };

  handleNumOfServingsOnChange = event => {
    const { selectedFoodDrink } = this.state;
    let targetValue = event.target.value;
    let numOfServings;

    if (targetValue[0] === 0) {
      numOfServings = targetValue.split("").slice(1);
    } else {
      numOfServings = targetValue;
    }

    this.setState(
      {
        selectedFoodDrink: {
          ...selectedFoodDrink,
          numOfServings: numOfServings.replace(/[^0-9]+/g, "")
        }
      },
      () => console.log(this.state.selectedFoodDrink)
    );
  };

  handleServingSizeOnChange = event => {
    const { selectedFoodDrink } = this.state;

    this.setState({
      selectedFoodDrink: Object.assign({}, this.state.selectedFoodDrink, {
        servingSize: event.target.value
      })
    });
  };

  handleMeasurementOnChange = event => {
    const { selectedFoodDrink } = this.state;
    this.setState({
      selectedFoodDrink: {
        ...selectedFoodDrink,
        measurement: event.target.value
      }
    });
  };

  handleMealSelectOnChange = event => {
    event.persist();
    console.log(`handleMealSelectOnChange`, event.target.value);
    console.log(this.props.user.meals);
    const foundMeal = this.props.user.meals.find(
      meal => meal._id === event.target.value
    );

    if (foundMeal) {
      console.log(`foundMeal`, foundMeal);
      this.setState(
        {
          selectedMeal: { ...foundMeal },
          showSelectAMealMessage: false
        },
        () => {
          LocalStorage.addToLocalStorage("selectedMeal", foundMeal);
        }
      );
    }
  };
  // ------------ / OnChange --------

  confirmMealReset = () => {
    this.props.beginConfirmMealReset24Hours();
  };

  render() {
    const { user } = this.props;
    const {
      meals,
      servingSizes,
      selectedMeal,
      timezoneGuess,
      formSubmitted,
      selectedFoodDrink,
      showSelectAMealMessage
    } = this.state;
    const { servingSize, numOfServings } = selectedFoodDrink;
    let noFoodDrinksYet = user.foodDrinks && user.foodDrinks.length < 1;
    const foodDrinksSelectClassNames = classNames(
      "flex",
      "column",
      "align-start",
      { "space-between": !noFoodDrinksYet },
      { "justify-start": noFoodDrinksYet }
    );
    let Meals;
    let AddButton;
    let MealsOptions;
    let NoMealsMessage;
    let AddFirstFoodItem;
    let FoodDrinkOptions;
    let QuantityErrorMessage;
    let SelectedFoodDrinkForm;
    let ShowSelectAMealMessage;
    let ServingSizeErrorMessage;

    //------------------------------------------------------
    // Conditional Components ( TODO convert to components )

    // ServingSizeMeasurement
    if (formSubmitted && (!servingSize || servingSize === "")) {
      ServingSizeErrorMessage = (
        <div className="consumable-error serving-size-error-message">
          Select a serving size.
        </div>
      );
    }

    // QuantityErrorMessage
    if (formSubmitted && (!numOfServings || parseFloat(numOfServings) === 0)) {
      QuantityErrorMessage = (
        <div className="consumable-error quantity-error-message">
          Enter the number of servings.
        </div>
      );
    }

    // AddFirstFoodItem
    if (noFoodDrinksYet) {
      AddFirstFoodItem = (
        <div className="add-first-food-item">
          <Link to="/me/add">Add my first item</Link>
        </div>
      );
    }

    if (user.foodDrinks && user.foodDrinks.length) {
      FoodDrinkOptions = user.foodDrinks.sort().map((foodDrink, index) => {
        return (
          <option
            className="consumable-option"
            name="consumable-option"
            value={foodDrink._id}
            key={index}
          >
            {foodDrink.name} [{foodDrink.foodOrDrink}] (
            {foodDrink.selectedMeasurement})
          </option>
        );
      });
    }

    // SelectedFoodDrinkForm
    if (selectedFoodDrink.hasOwnProperty("_id")) {
      SelectedFoodDrinkForm = (
        <div
          ref="consumable"
          data-consumable-id={selectedFoodDrink._id}
          className={`flex column ${
            selectedFoodDrink.foodOrDrink === "food" ? "food" : "drink"
          }`}
        >
          <form className="consumable-form flex column space-around align-center">
            <div className="serving-size">
              <label htmlFor="serving-size-select">
                Serving Size
                <select
                  ref="serving-size"
                  name="serving-size"
                  id="serving-size-select"
                  value={selectedFoodDrink.servingSize}
                  onChange={this.handleServingSizeOnChange}
                >
                  <option disabled selected value="">
                    Select a Serving
                  </option>
                  {servingSizes.map((servingSize, index) => {
                    return (
                      <option key={index + 1} value={servingSize}>
                        {servingSize}
                      </option>
                    );
                  })}
                </select>
                {ServingSizeErrorMessage}
              </label>
            </div>

            <div className="quantity">
              <label htmlFor="quantity-input">
                How many servings?
                <input
                  id="quantity-input"
                  type="number"
                  name="numOfServings"
                  value={String(numOfServings)}
                  placeholder="How many?"
                  onChange={event => {
                    this.setFormSubmitted(false);
                    this.handleNumOfServingsOnChange(event);
                  }}
                />
                {QuantityErrorMessage}
              </label>
            </div>
            {/*
                <div className="buttons">
                  <i className="fa fa-info"></i>
                  <button type="button">Calculate</button>
                  <button type="button">Smart Calculate</button>
                </div>
                */}
            {AddButton}
          </form>
        </div>
      );
    }

    // MealsOptions
    if (meals && meals.length) {
      MealsOptions = this.props.user.meals.map((meal, index) => {
        return (
          <option key={index + 1} value={meal.id}>
            {meal.name}
          </option>
        );
      });
    }

    if (showSelectAMealMessage && formSubmitted) {
      ShowSelectAMealMessage = (
        <div className="select-a-meal-message flex center-all">
          Please select a meal
        </div>
      );
    }

    // Conditional Components
    //-------------------------------------------

    if (this.props.user.isAuthenticated) {
      return (
        <ErrorBoundary>
          <div className="make-a-meal view center-all" styles={MakeAMealStyles}>
            {/* Main Content */}
            <div className="view-main">
              <div className="content">
                {/* Food Drinks - Select Menu on change shows the FoodDrink options and Add To meal */}
                <ChooseAConsumable
                  formSubmitted={this.state.formSubmitted}
                  selectedMeal={this.state.selectedMeal}
                  foodDrinks={this.props.user.foodDrinks}
                  foodDrinkSelectValue={this.state.foodDrinkSelectValue}
                  selectedFoodDrink={selectedFoodDrink}
                  servingSizes={servingSizes}
                  foodDrinkSelectOnChange={this.handleFoodDrinkSelectOnChange}
                  servingSizeOnChange={this.handleServingSizeOnChange}
                  setFormIsSubmitted={this.setFormSubmitted}
                  handleNumOfServingsOnChange={this.handleNumOfServingsOnChange}
                  saveFoodDrinkToMeal={this.saveFoodDrinkToMeal}
                />

                {/* Meals */}
                <MyMeals
                  meals={this.props.user.meals}
                  selectedMeal={this.state.selectedMeal}
                  createNewMeal={this.createNewMeal}
                  deleteMeal={this.deleteMeal}
                  saveMeals={this.saveMeals}
                  saveMealName={this.saveMealName}
                  handleMealNameOnChange={this.handleMealNameOnChange}
                  handleMealSelectOnChange={this.handleMealSelectOnChange}
                />
              </div>
            </div>

            {/* FoodDrink Detail 'Modal' */}
            {this.state.showDetailModal && (
              <Detail
                styles={DetailStyles}
                servingSize={this.state.servingSize}
                item={this.state.selectedFoodDrink}
                close={this.handleOnCloseDetail}
              />
            )}
          </div>
        </ErrorBoundary>
      );
    } else {
      return <div>Waiting...</div>;
    }
  }
}

const mapStateToProps = state => {
  return {
    confirmed24HourMealResetMessage:
      state.userReducers.confirmed24HourMealResetMessage,
    isConfirming24HourMealResetMessages:
      state.userReducers.isConfirming24HourMealResetMessages,
    isConfirming24Message:
      state.userReducers.isConfirming24HourMealResetMessage,
    showAlert: state.alertReducers.showAlert,
    isSavingMeals: state.dashboardReducers.isSavingMeals,
    isCreatingNewMeal: state.dashboardReducers.isCreatingNewMeal,
    user: state.userReducers
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUser: user => dispatch(setUser(user)),
    setAlert: (isVisible, title, body) =>
      dispatch(setAlert(isVisible, title, body)),
    setLoader: (isVisible, text, showSpinner = true) =>
      dispatch(setLoader(isVisible, text, showSpinner)),
    beginConfirmMealReset24Hours: () =>
      dispatch(beginConfirm24HourMealResetMessage()),
    beginCreatingNewMeal: meal => dispatch(beginCreatingNewMeal(meal)),
    calculateTotals: () => dispatch(calculateTotals()),
    beginSavingMeals: meals => dispatch(beginSavingMeals(meals))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MakeAMeal);
