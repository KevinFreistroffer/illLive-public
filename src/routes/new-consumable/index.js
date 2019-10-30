import React, { Component } from "react";
import { Button } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import clsx from "clsx";
import classNames from "classnames";
import configs from "../../configs";
import {
  addToLocalStorage,
  removeFromLocalStorage,
  getItem as getFromLocalStorage
} from "../../utilities/localStorage";

import * as vitaminsJSON from "../../vitamins.json";
import * as NewConsumableStyles from "./styles.scss";

import _ from "lodash";

import AreYouSure from "./AreYouSure";
import FoodDrinkInputName from "./Name";
import FoodOrDrink from "./Type";
import Measurements from "./Measurements";
import NutritionalData from "./NutritionalData";
import ViewHeader from "../../components/ViewHeader";
import NutritionalInfoTransition from "./NutritionalInfoTransition";

import { setAlert } from "../../actions/alert.actions";
import { setUser } from "../../actions/user.actions";
import {
  beginSavingNewFoodDrink,
  pushToSaveFoodDrinkErrors
} from "../../actions/dashboard.actions";
import {
  MEASUREMENT_REQUIRED,
  FOOD_OR_DRINK_REQUIRED,
  FOODDRINK_NAME_REQUIRED
} from "../../actions/types";

import {
  DEFAULT_FOOD_OR_DRINK_VALUE,
  DEFAULT_SELECTED_MEASUREMENT_VALUE
} from "./constants";

const confirmContainerStyles = {
  position: "fixed",
  top: "0",
  right: "0",
  bottom: "0",
  left: "0",
  width: "100%",
  height: "100vh",
  display: "flex",
  zIndex: "999999999",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(2, 2, 2, 0.5)"
};

export class Add extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 1,
      steps: [
        {
          name: "name",
          capitalizedName: "Name",
          completed: false
        },
        {
          name: "type",
          capitalizedName: "Type",
          completed: false
        },
        {
          name: "measurements",
          capitalizedName: "Measurements",
          completed: false
        },
        {
          name: "nutritionalData",
          capitalizedName: "Nutritional Data",
          completed: false
        }
      ],
      skipped: [],
      title: "Save a new consumable",
      foodDrinkInputName: "",
      foodOrDrink: DEFAULT_FOOD_OR_DRINK_VALUE,
      selectedMeasurement: DEFAULT_SELECTED_MEASUREMENT_VALUE,
      measurements: [],
      servingSize: "",
      showAreYouSure: false,
      measurementEditMode: false,
      calories: null,
      vitaminA: null,
      vitaminB1: null,
      vitaminB2: null,
      vitaminB3: null,
      vitaminB5: null,
      vitaminB6: null,
      vitaminB7: null,
      vitaminB12: null,
      calcium: null,
      choline: null,
      chromium: null,
      copper: null,
      fluoride: null,
      folicAcid: null,
      iodine: null,
      iron: null,
      magnesium: null,
      manganese: null,
      molybdenum: null,
      phosphorus: null,
      potassium: null,
      selenium: null,
      salt: null,
      vitaminD3: null,
      vitaminE: null,
      vitaminK: null,
      zinc: null,
      formSubmitted: false,
      showOneMeasurementRequiredMessage: false,
      selectedTypeOfRequiredMessage: "Please select a food or drink item.",
      selectedMeasurementRequiredMessage:
        "Selecting a measurement is required.",
      atLeastOneMeasurementRequiredMessage:
        "You must keep at least once measurement.",
      formErrors: [],
      isDesktop: false,
      innerWidth: 0,
      isValidForm: false,
      isInStepperPhase: true,
      isTransitioningToNutritionalData: false,
      hasSeenTransitionToNutritionalData: false
    };

    document.title = "New Food or Drink";

    console.log(vitaminsJSON);
  }

  componentDidMount() {
    // TODO consider using a constant for name of step localStorage value
    //      and rename 'step' to something else.
    const step = getFromLocalStorage("step") ? getFromLocalStorage("step") : 1;
    this.setState({
      step,
      windowInnerWidth: window.innerWidth,
      isDesktop: window.innerWidth < configs.minDesktopViewport ? false : true
    });

    window.addEventListener("resize", () => {
      this.setState({
        windowInnerWidth: window.innerWidth,
        isDesktop: window.innerWidth < configs.minDesktopViewport ? false : true
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    // Handle success saving a new foodDrink.
    if (
      !prevProps.successSavingNewFoodDrink &&
      this.props.successSavingNewFoodDrink
    ) {
      this.clearForm();
      this.clearNutritionalDataForm();
      removeFromLocalStorage(["newConsumableValues", "step"]);
      this.setState({
        isInStepperPhase: true
      });
    }

    //Handle if the saveNewFoodDrinkErrors array obtains a length
    if (
      !prevProps.saveNewFoodDrinkErrors.length &&
      this.props.saveNewFoodDrinkErrors.length > 0
    ) {
      setAlert(true, `Please fix these errors`, `fdsafds`);
    }

    // Handle step change
    if (prevState.step !== this.state.step) {
      addToLocalStorage("step", this.state.step);
    }
  }

  componentDidCatch(error, info) {
    console.log(`componentDidCatch()`);
    console.log(error);
    console.log(info);
  }

  static getDerivedStateFromError(error) {
    console.log(error);
  }

  // Rename this to something about handling vitamin inputs on change
  handleOnChange = event => {
    console.log(`handleOnChange`);
    event.persist();
    this.setState(
      {
        [event.target.name]: parseInt(event.target.value)
      },
      () => {
        addToLocalStorage("newConsumableValues", {
          foodDrinkInputName: this.state.foodDrinkInputName,
          foodOrDrink: this.state.foodOrDrink,
          selectedMeasurement: this.state.selectedMeasurement,
          calories: this.state.calories,
          vitaminA: this.state.vitaminA,
          vitaminB1: this.state.vitaminB1,
          vitaminB2: this.statevitaminB2,
          vitaminB3: this.state.vitaminB3,
          vitaminB5: this.state.vitaminB5,
          vitaminB6: this.state.vitaminB6,
          vitaminB7: this.state.vitaminB7,
          vitaminB12: this.state.vitaminB12,
          calcium: this.state.calcium,
          choline: this.state.choline,
          chromium: this.state.chromium,
          copper: this.state.copper,
          fluoride: this.state.fluoride,
          folicAcid: this.state.folicAcid,
          iodine: this.state.iodine,
          iron: this.state.iron,
          magnesium: this.state.magnesium,
          manganese: this.state.manganese,
          molybdenum: this.state.molybdenum,
          phosphorus: this.state.phosphorus,
          potassium: this.state.potassium,
          selenium: this.state.selenium,
          salt: this.state.salt,
          vitaminD3: this.state.vitaminD3,
          vitaminE: this.state.vitaminE,
          vitaminK: this.state.vitaminK,
          zinc: this.state.zinc
        });

        console.log(`CALORIESSSSS`, this.state.calories);
      }
    );
  };

  /* So yeah I created the COokies display and so on click it should call an action that
  // confirm 24hourMealREset message*/

  handleFoodDrinkInputOnChange = event => {
    console.log(`handleFoodDrinkInputOnChange`);
    let stepsToUpdate = this.state.steps.slice();

    stepsToUpdate[0].completed =
      event.target.value.trim() === "" ? false : true;

    this.setState({
      foodDrinkInputName: event.target.value,
      steps: stepsToUpdate
    });
  };

  handleNewMeasurementOnChange = event => {
    console.log(`handleNewMeasurementOnChange`);
    const measurementIsAlreadyAdded = this.measurementIsAlreadyAdded(
      event.target.value
    );

    if (!measurementIsAlreadyAdded) {
      this.setState({ newMeasurement: event.target.value }, () => {
        console.log(`setState calling debounceValidateForm`);
        this.debounceValidateForm();
      });
    }
  };

  outputQuantity = () => {
    let quantity = [];

    this.state.quantity.forEach((q, index) => {
      quantity.push(index + 1);
    });

    return quantity.map((quantity, index) => {
      return <option name={`quantity-${quantity}`}>{quantity}</option>;
    });
  };

  outputVitamins = () => {};

  areYouSure = () => {
    this.setState({ showAreYouSure: true });
  };

  handleAnswer = answer => {
    this.setState({ showAreYouSure: false }, () => {
      if (answer === "yes") {
        this.clearForm();
        // // TODO delete session using sessionStorage action creater
      }
    });
  };

  clearForm = () => {
    this.setState(
      {
        step: 1,
        steps: [
          {
            name: "name",
            capitalizedName: "Name",
            completed: false
          },
          {
            name: "type",
            capitalizedName: "Type",
            completed: false
          },
          {
            name: "measurements",
            capitalizedName: "Measurements",
            completed: false
          },
          {
            name: "nutritionalData",
            capitalizedName: "Nutritional Content",
            completed: false
          }
        ],
        title: "Save a new consumable",
        foodDrinkInputName: "",
        foodOrDrink: DEFAULT_FOOD_OR_DRINK_VALUE,
        selectedMeasurement: DEFAULT_SELECTED_MEASUREMENT_VALUE,
        measurements: [],
        servingSize: "",
        showAreYouSure: false,
        measurementEditMode: false,
        calories: null,
        vitaminA: 0,
        vitaminB1: 0,
        vitaminB2: 0,
        vitaminB3: 0,
        vitaminB5: 0,
        vitaminB6: 0,
        vitaminB7: 0,
        vitaminB12: 0,
        calcium: 0,
        choline: 0,
        chromium: 0,
        copper: 0,
        fluoride: 0,
        folicAcid: 0,
        iodinee: 0,
        iron: 0,
        magnesium: 0,
        molybdenum: 0,
        phosphorus: 0,
        potassium: 0,
        selenium: 0,
        salt: 0,
        vitaminD3: 0,
        vitaminE: 0,
        vitaminK: 0,
        zinc: 0,
        formSubmitted: false,
        showOneMeasurementRequiredMessage: false,
        selectedTypeOfRequiredMessage: "Please select a food or drink item.",
        selectedMeasurementRequiredMessage:
          "Selecting a measurement is required.",
        atLeastOneMeasurementRequiredMessage:
          "You must keep at least once measurement.",
        formErrors: []
      },
      () => {
        // Clear item name, description and vitamin values
        document.getElementById("food-drink-name-input").value = "";
        document.querySelectorAll(".add-form-input").forEach(input => {
          input.value = "";
        });
      }
    );
  };

  setfoodOrDrink = type => {
    this.setState(
      {
        foodOrDrink: type
      },
      () => {
        // TODO update session using sessionStorage action creater
      }
    );
  };

  setSelectedMeasurement = selectedMeasurement => {
    this.turnEditModeOff();
    this.setState({ selectedMeasurement });
  };

  addNewMeasurement = () => {
    const { newMeasurement, measurements } = this.state;
    const measurementIsAlreadyAdded = this.measurementIsAlreadyAdded(
      newMeasurement
    );

    console.log(newMeasurement);

    if (!measurementIsAlreadyAdded) {
      this.setState({
        measurements: [...measurements, newMeasurement],
        showOneMeasurementRequiredMessage: false
      });
    }
  };

  turnEditModeOn = () => {
    this.setState({ measurementEditMode: true });
  };

  turnEditModeOff = () => {
    this.setState({ measurementEditMode: false });
  };

  deleteMeasurement = measurementIndex => {
    const { measurements } = this.state;

    // This is the last measurement. You cannot delete it.
    if (measurements.length && measurements.length === 1) {
      this.setState({
        measurementEditMode: false,
        showOneMeasurementRequiredMessage: true
      });
    } else {
      this.setState({
        measurements: this.state.measurements.filter((measurement, index) => {
          return index !== measurementIndex;
        }),
        measurementEditMode: true,
        showOneMeasurementRequiredMessage: false
      });
    }
  };

  measurementIsAlreadyAdded = newMeasurement => {
    return this.state.measurements.some((measurement, index) => {
      return measurement.toLowerCase() === newMeasurement.toLowerCase();
    });
  };

  isValidForm = () => {
    const { foodDrinkInputName, foodOrDrink, selectedMeasurement } = this.state;
    let isValidForm = false;
    let errors = [];

    if (
      foodDrinkInputName !== "" &&
      (foodOrDrink !== "" && foodOrDrink !== DEFAULT_FOOD_OR_DRINK_VALUE) &&
      (selectedMeasurement !== "" &&
        selectedMeasurement !== DEFAULT_SELECTED_MEASUREMENT_VALUE)
    ) {
      isValidForm = true;

      // this.props.notSureSomehowClearSaveFoodDrinkErrors array
      // this.props.clearSaveFoodDrinksErrors()
    } else {
      if (foodDrinkInputName === "") {
        errors.push({
          type: FOODDRINK_NAME_REQUIRED,
          message: "What is the name of your food or drink item?"
        });
      }

      if (foodOrDrink === "" || foodOrDrink === "Select a type") {
        errors.push({
          type: FOOD_OR_DRINK_REQUIRED,
          message: "Is this a food or drink?"
        });
      }

      if (
        selectedMeasurement === "" ||
        selectedMeasurement === "Select a measurement"
      ) {
        errors.push({
          type: MEASUREMENT_REQUIRED,
          message: "Please select a measurement?"
        });
      }

      // TODO this function isn't real.
      //this.props.pushToSaveFoodDrinkErrors(errors);

      isValidForm = false;
    }

    return isValidForm;
  };

  setIsValidForm = isValidForm => {
    this.setState({ isValidForm });
  };

  delayIsValidForm = () => {
    console.log(`delayIsValidForm()`);
    _.delay(() => {}, 400, () => {
      this.setIsValidForm(this.isValidForm());
    });
  };

  saveFoodOrDrink = () => {
    const { selectedMeasurement } = this.state;
    // So if the 3 steps are valid, Add.
    // I click on Add, disabled if any of those or formSubmitted.
    // I click on Add, form is submitted, disdabled.
    // Form is not valid, disabled = false
    // otherwise disabled is true
    // beginSavingNewFoodDrink
    // If the form is valid, formSubmitted remains true
    //
    console.log(`IS VALID FORM`, this.isValidForm());
    if (this.isValidForm()) {
      this.setState({ formSubmitted: true, isValidForm: true }, () => {
        const foodDrink = {
          details: {
            name: this.state.foodDrinkInputName,
            foodOrDrink: this.state.foodOrDrink,
            measurements: [...this.props.user.measurements],
            selectedMeasurement
          },
          nutritionalData: {
            quantity: this.state.quantity,
            calories: this.state.calories,
            vitaminA: this.state.vitaminA,
            vitaminB1: this.state.vitaminB1,
            vitaminB2: this.state.vitaminB2,
            vitaminB3: this.state.vitaminB3,
            vitaminB5: this.state.vitaminB5,
            vitaminB6: this.state.vitaminB6,
            vitaminB7: this.state.vitaminB7,
            vitaminB12: this.state.vitaminB12,
            calcium: this.state.calcium,
            choline: this.state.choline,
            chromium: this.state.chromium,
            copper: this.state.copper,
            fluoride: this.state.fluoride,
            folicAcid: this.state.folicAcid,
            iodine: this.state.iodine,
            iron: this.state.iron,
            magnesium: this.state.magnesium,
            molybdenum: this.state.selenium,
            salt: this.state.molybdenum,
            phosphorus: this.state.phosphorus,
            potassium: this.state.potassium,
            selenium: this.state.salt,
            vitaminD3: this.state.vitaminD3,
            vitaminE: this.state.vitaminE,
            vitaminK: this.state.vitaminK,
            zinc: this.state.zinc
          }
        };
        console.log(foodDrink);
        this.props.beginSavingNewFoodDrink(foodDrink);
      });
    } else {
      alert("NOT VALID FORM");
      // state.formSubmitted is false by default
    }
  };

  handleMesurementsOnChange = event => {
    this.setIsValidForm(this.isValidForm());
    this.setState({
      newMeasurement: event.target.value.trim()
    });
  };

  handleFoodOrDrinkOnChange = foodOrDrink => {
    let stepsToUpdate = this.state.steps.slice();
    stepsToUpdate[1].completed = true;
    this.setState({
      steps: stepsToUpdate,
      foodOrDrink
    });
  };

  handleMeasurementSelectOnChange = measurement => {
    console.log(`handleMeasurementSelectOnChange`, measurement);

    // ideally
    let stepsToUpdate = this.state.steps.slice();
    stepsToUpdate[2].completed = true;

    // So yeah fat arrow functions remove the scope restriction??
    this.setState({
      steps: stepsToUpdate,
      selectedMeasurement: measurement
    });
  };

  previous = () => {
    console.log(`previous`);
    const { step, steps } = this.state;

    if (step > 1) {
      console.log(`step > 1`);
      this.setState(
        {
          step: step - 1
        },
        () => {
          console.log(this.state.step);
        }
      );
    }
  };

  next = () => {
    const { step, steps } = this.state;

    if (step < steps.length) {
      this.setState(
        prevState => {
          return {
            step: prevState.step + 1
          };
        },
        () => {
          console.log(this.state.step);
        }
      );
    } else {
      this.setState({
        isInStepperPhase: false,
        isTransitioningToNutritionalData: !this.state
          .hasSeenTransitionToNutritionalData
      });
    }
  };

  setStep = selectedStep => {
    console.log(`setStep`, selectedStep);
    this.setState({ step: selectedStep });
  };

  isStepSkipped(step) {
    //return this.skipped.includes(step);
  }

  clearNutritionalDataForm = () => {
    this.setState({
      calories: null,
      vitaminA: 0,
      vitaminB1: 0,
      vitaminB2: 0,
      vitaminB3: 0,
      vitaminB5: 0,
      vitaminB6: 0,
      vitaminB7: 0,
      vitaminB12: 0,
      calcium: 0,
      choline: 0,
      chromium: 0,
      copper: 0,
      fluoride: 0,
      folicAcid: 0,
      iodinee: 0,
      iron: 0,
      magnesium: 0,
      molybdenum: 0,
      phosphorus: 0,
      potassium: 0,
      selenium: 0,
      salt: 0,
      vitaminD3: 0,
      vitaminE: 0,
      vitaminK: 0,
      zinc: 0
    });
  };

  handleNutritionalDataGoBack = () => {
    console.log("handleNutritionalDataGoBack");
    this.setState(
      {
        isInStepperPhase: true
      },
      () => {
        console.log(this.state);
      }
    );
  };

  handleSetIsTransitioningState = isTransitioning => {
    this.setState({
      isTransitioningToNutritionalData: isTransitioning
    });
  };

  handleSetHasSeenNutritionalDataTransition = () => {
    console.log("handleSetHasSeenNutritionalDataTransition");
    this.setState({
      hasSeenTransitionToNutritionalData: true
    });
  };

  clearActiveStepFormValue = () => {
    console.log(`clearActiveStepFormValue`);
    switch (this.state.step) {
      case 1:
        this.setState(prevState => {
          let steps = prevState.steps;
          steps[0].completed = false;

          return {
            ...steps,
            foodDrinkInputName: ""
          };
        });
        break;
      case 2:
        this.setState(prevState => {
          let steps = prevState.steps;
          steps[1].completed = false;

          return {
            ...steps,
            foodOrDrink: DEFAULT_FOOD_OR_DRINK_VALUE
          };
        });
        break;
      case 3:
        this.setState(prevState => {
          let steps = prevState.steps;
          steps[2].completed = false;

          return {
            ...steps,
            selectedMeasurement: DEFAULT_SELECTED_MEASUREMENT_VALUE
          };
        });
        break;
      case 4:
        this.setState(
          {
            steps: this.state.steps.map((s, i) => {
              if (i + 1 === this.state.step) {
                return {
                  ...this.state.steps[this.state.step - 1],
                  completed: false
                };
              }

              return s;
            })
          },
          () => this.clearNutritionalDataForm()
        );
        break;
      default:
        break;
    }
  };

  render() {
    const {
      step,
      steps,
      showOneMeasurementRequiredMessage,
      atLeastOneMeasurementRequiredMessage,
      isDesktop,
      foodOrDrink
    } = this.state;

    const contentClasses = classNames({
      content: this.state.isInStepperPhase,
      "content-with-padding": !this.state.isInStepperPhase
    });

    let FormErrors;
    let FoodOrDrinkIcon;
    let EditMeasurementButton;
    let OneMeasurementRequiredMessage;

    if (foodOrDrink !== DEFAULT_FOOD_OR_DRINK_VALUE) {
      if (foodOrDrink === "food") {
        FoodOrDrinkIcon = <i className="fa fa-leaf"></i>;
      } else {
        FoodOrDrinkIcon = <i className="fa fa-coffee"></i>;
      }
    } else {
      FoodOrDrinkIcon = "";
    }

    if (this.props.isAuthenticated) {
      if (showOneMeasurementRequiredMessage) {
        OneMeasurementRequiredMessage = (
          <div className="one-measurement-required">
            {atLeastOneMeasurementRequiredMessage}
          </div>
        );
      }

      if (
        this.props.user.measurements &&
        Array.isArray(this.props.user.measurements)
      ) {
        EditMeasurementButton = (
          <button
            type="button"
            className="measurement-edit-button"
            onClick={() => {
              !this.state.measurementEditMode
                ? this.turnEditModeOn()
                : this.turnEditModeOff();
            }}
          >
            Delete
          </button>
        );
      }

      if (
        !this.state.isInStepperPhase &&
        this.state.isTransitioningToNutritionalData &&
        !this.state.hasSeenTransitionToNutritionalData
      ) {
        return (
          <NutritionalInfoTransition
            setIsTransitioningState={this.handleSetIsTransitioningState}
            setHasSeenNutritionalDataTransition={
              this.handleSetHasSeenNutritionalDataTransition
            }
          ></NutritionalInfoTransition>
        );
      } else {
        return (
          <div
            className="new-consumable view flex column center-all"
            styles={NewConsumableStyles}
          >
            {/* <div className="view-header flex align-center space-between">
              <h1 className="view-title">{this.state.title}</h1>
              {this.state.isDesktop && (
                <div className="form-group form-group-form-controls  buttons flex center-all">
                  {FormErrors}
                </div>
              )}
            </div> */}
            <div className="view-main">
              <div className={contentClasses}>
                <>
                  <div id="steps-tabs">
                    <ul className="flex">
                      {this.state.steps.map((s, i) => {
                        return (
                          <li
                            className={
                              this.state.step === i + 1 ? "active" : ""
                            }
                            onClick={() => this.setState({ step: i + 1 })}
                          >
                            {s.capitalizedName}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div id="mobile-steps">
                    <div className="step flex align-center">
                      <span
                        className={this.state.step === 1 ? "hidden" : ""}
                        onClick={() => {
                          if (this.state.step !== 1) {
                            this.setState({
                              step:
                                this.state.step > 1
                                  ? (this.state.step -= 1)
                                  : this.state.step
                            });
                          }
                        }}
                      >
                        <i className="fa fa-chevron-left"></i>
                      </span>
                      <span className="name">
                        {this.state.steps[this.state.step - 1].capitalizedName}
                      </span>
                      <span
                        className={
                          this.state.step === this.state.steps.length
                            ? "hidden"
                            : ""
                        }
                        onClick={() => {
                          if (this.state.step < this.state.steps.length) {
                            this.setState({
                              step:
                                this.state.step < this.state.steps.length
                                  ? (this.state.step += 1)
                                  : this.state.step
                            });
                          }
                        }}
                      >
                        <i className="fa fa-chevron-right"></i>
                      </span>
                    </div>
                  </div>
                  <div className="steps-container flex column">
                    <div id="steps-header" className="flex space-between">
                      <div className="flex align-center">
                        <div className="name">
                          {this.state.foodDrinkInputName === ""
                            ? "My item"
                            : this.state.foodDrinkInputName}
                        </div>
                        <div className="food-or-drink-icon">
                          {FoodOrDrinkIcon}
                        </div>
                        <div className="measurement">
                          {this.state.selectedMeasurement !==
                          DEFAULT_SELECTED_MEASUREMENT_VALUE
                            ? `(${this.state.selectedMeasurement})`
                            : ""}
                        </div>
                      </div>

                      <div className="buttons flex justify-end align-center">
                        <button
                          className="btn btn-primary save"
                          type="button"
                          onClick={this.saveFoodOrDrink}
                        >
                          Add
                        </button>
                        {/* <button
                        className="btn btn-primary restart"
                        type="button"
                        onClick={this.areYouSure}
                      >
                        Restart
                      </button>

                      <button
                        type="button"
                        onClick={this.clearActiveStepFormValue}
                        className="btn btn-primary clear"
                      >
                        Clear
                      </button> */}
                      </div>
                    </div>
                    <div id="steps-content">
                      <div className="step">
                        {this.state.step === 1 && (
                          <FoodDrinkInputName
                            name={this.state.foodDrinkInputName}
                            handleOnChange={this.handleFoodDrinkInputOnChange}
                          />
                        )}

                        {this.state.step === 2 && (
                          <FoodOrDrink
                            foodOrDrink={this.state.foodOrDrink}
                            handleOnChange={this.handleFoodOrDrinkOnChange}
                          />
                        )}

                        {this.state.step === 3 && (
                          <Measurements
                            selectedMeasurement={this.state.measurement}
                            measurements={this.props.user.measurements}
                            selectedMeasurement={this.state.selectedMeasurement}
                            oneMeasurementRequiredMessage={
                              OneMeasurementRequiredMessage
                            }
                            handleOnChange={
                              this.handleMeasurementSelectOnChange
                            }
                          />
                        )}

                        {this.state.step === 4 && (
                          <NutritionalData
                            state={this.state}
                            vitaminsJSON={vitaminsJSON}
                            outputVitamins={this.outputVitamins}
                            handleOnChange={event => {
                              console.log(
                                event.target.name,
                                event.target.value
                              );
                              this.handleOnChange(event);
                            }}
                            save={() => {
                              this.saveFoodOrDrink();
                            }}
                            goBack={() => {
                              this.handleNutritionalDataGoBack();
                            }}
                            clearInnerForm={() => {
                              this.clearNutritionalDataForm();
                            }}
                            oneMeasurementRequiredMessage={
                              OneMeasurementRequiredMessage
                            }
                          >
                            {this.props.children}
                          </NutritionalData>
                        )}
                      </div>
                    </div>
                    <div id="steps-controls">
                      <div
                        id="steps-controls-container"
                        className="flex center-all"
                      >
                        <Button
                          type="button"
                          disabled={this.state.step === 1}
                          onClick={this.previous}
                          className={`flex space-between align-center ${
                            this.state.step === 1 ? "disabled" : ""
                          }`}
                        >
                          Previous
                        </Button>

                        <Button
                          type="button"
                          disabled={this.state.step === this.state.steps.length}
                          onClick={this.next}
                          className={`flex space-between align-center ${
                            this.state.step === this.state.steps.length
                              ? "disabled"
                              : ""
                          }`}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              </div>

              <form>
                {/* Type of food or drink and name*/}
                <div className="form-group type-of-and-name-group flex center-all">
                  <div className="form-group-content type-of-and-name flex space-around" />
                </div>
              </form>

              {/* "Are you sure?" modal */}
              {this.state.showAreYouSure ? (
                <div style={confirmContainerStyles}>
                  <AreYouSure answerIs={this.handleAnswer} />
                </div>
              ) : null}
            </div>
          </div>
        );
      }
    } else {
      return (
        <div className="view-with-padding flex center-all color-black">
          <Link to="/auth/signin">Sign In</Link>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    showAlert: state.alertReducers.showAlert,
    user: state.userReducers,
    isAuthenticated: state.userReducers.isAuthenticated,
    isSavingNewFoodDrink: state.dashboardReducers.isSavingNewFoodDrink,
    successSavingNewFoodDrink:
      state.dashboardReducers.successSavingNewFoodDrink,
    saveNewFoodDrinkErrors: state.userReducers.saveNewFoodDrinkErrors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUser: user => {
      dispatch(setUser(user));
    },
    setAlert: (isVisible, title = "", body = "") => {
      dispatch(setAlert(isVisible, title, body));
    },
    beginSavingNewFoodDrink: foodDrink =>
      dispatch(beginSavingNewFoodDrink(foodDrink)),
    pushToSaveFoodDrinkErrors: errors => {
      dispatch(pushToSaveFoodDrinkErrors(errors));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Add);
