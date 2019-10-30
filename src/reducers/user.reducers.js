import {
  BEGIN_STORING_USER,
  STORE_USER,
  STORE_AUTHENTICATION_TOKEN,
  STORE_ACCOUNT_CONFIRMATION_TOKEN,
  STORE_API_TOKEN,
  BEGIN_SIGNING_OUT,
  SUCCESS_SIGNING_OUT,
  FAILURE_SIGNING_OUT,
  BEGIN_SIGNING_IN,
  SUCCESS_SIGNING_IN,
  FAILURE_SIGNING_IN,
  BEGIN_SIGNING_UP,
  SUCCESS_SIGNING_UP,
  FAILURE_SIGNING_UP,
  RESET_IS_SIGNED_UP,
  BEGIN_AUTHENTICATING,
  SUCCESS_AUTHENTICATING,
  FAILURE_AUTHENTICATING,
  BEGIN_CONFIRMING_ACCOUNT,
  SUCCESS_CONFIRMING_ACCOUNT,
  FAILURE_CONFIRMING_ACCOUNT,
  SET_CONFIRM_COOKIE_FLAG,
  BEGIN_CONFIRM_24_HOUR_MEAL_RESET,
  SUCCESS_CONFIRMING_24_HOUR_MEAL_RESET,
  FAILURE_CONFIRMING_24_HOUR_MEAL_RESET,
  BEGIN_PASSWORD_RESET,
  SUCCESS_PASSWORD_RESET,
  FAILURE_PASSWORD_RESET,
  SET_FORM_ERROR
} from "../actions/types";

// TODO change the errors[] to a single Object. Can't think of times when
// multiple errors would exist.
const initialState = {
  username: "",
  email: "",
  password: "", // TODO remove password
  confirmationToken: "",
  authenticationToken: "",
  apiToken: "",
  foodDrinks: [],
  measurements: [],
  formError: "",
  authenticationErrors: [], // TODO I think can be deleted
  signInErrors: [], // TODO can be deleted
  saveNewFoodDrinkErrors: [], // TODO probably can be deleted
  confirm24HourMealResetMessageErrors: [], // TODO probably can be deleted f
  confirmed24HourMealResetMessage: false,
  isConfirming24HourMealResetMessage: false,
  accountConfirmationError: {},
  accountConfirmed: false,
  isStoringUser: false,
  isAuthenticating: false,
  isAuthenticated: false,
  isSigningIn: false,
  isSigningUp: false,
  isSignedUp: false,
  isSigningOut: false,
  isConfirmingAccount: false,
  isSendingResetPasswordEmail: false,
  resetPasswordEmailSent: false,
  isAddingNewFoodDrink: false,
  confirmedCookieFlag: false
};

export const userReducers = (state = initialState, action) => {
  console.log(action.type);
  console.log(action.payload);
  switch (action.type) {
    case BEGIN_STORING_USER:
      return {
        ...state,
        isStoringUser: true
      };
    case STORE_USER:
      //console.log(`STORE_USER`);
      return {
        ...state,
        ...action.payload.user,
        isStoringUser: false
      };

    case BEGIN_AUTHENTICATING:
      return {
        ...state,
        isAuthenticating: true
      };

    case SUCCESS_AUTHENTICATING:
      return {
        ...state,
        isAuthenticating: false,
        isAuthenticated: true,
        authenticationErrors: []
      };

    case FAILURE_AUTHENTICATING:
      return {
        ...state,
        isAuthenticating: false,
        isAuthenticated: false,
        authenticationErrors: [action.payload.errors]
      };

    case STORE_ACCOUNT_CONFIRMATION_TOKEN:
      return {
        ...state,
        confirmationToken: action.token
      };

    case STORE_AUTHENTICATION_TOKEN:
      return {
        ...state,
        authenticationToken: action.token
      };

    case STORE_API_TOKEN:
      return {
        ...state,
        apiToken: action.token
      };

    case BEGIN_SIGNING_IN:
      return {
        ...state,
        isSigningIn: true
      };

    case SUCCESS_SIGNING_IN:
      return {
        ...state,
        isSigningIn: false,
        isAuthenticated: true,
        signInErrors: []
      };

    case FAILURE_SIGNING_IN:
      console.log(`FAILURE_SIGNING_IN()`, action.payload.error);
      return {
        ...state,
        isSigningIn: false,
        isAuthenticated: false,
        formErrorText: action.payload.error
      };

    case BEGIN_SIGNING_UP:
      return {
        ...state,
        isSigningUp: true
      };

    case SUCCESS_SIGNING_UP:
      return {
        ...state,
        isSigningUp: false,
        isSignedUp: true
      };

    case RESET_IS_SIGNED_UP:
      return {
        ...state,
        isSignedUp: false
      };

    case FAILURE_SIGNING_UP:
      console.log(`failure_signing_up`);
      return {
        ...state,
        isSigningUp: false,
        isSignedUp: false
      };

    case BEGIN_SIGNING_OUT:
      return {
        ...state,
        isSigningOut: true
      };

    case SUCCESS_SIGNING_OUT:
      return {
        ...state,
        username: "",
        email: "",
        password: "",
        confirmationToken: "",
        authenticationToken: "",
        apiToken: "",
        foodDrinks: [],
        measurements: [],
        formError: "",
        authenticationErrors: [],
        signInErrors: [],
        saveNewFoodDrinkErrors: [],
        accountConfirmationError: {
          ...state
        },
        accountConfirmed: false,
        isAuthenticating: false,
        isAuthenticated: false,
        isSigningIn: false,
        isSigningUp: false,
        isSigningOut: false,
        isConfirmingAccount: false,
        isAddingNewFoodDrink: false,
        confirmedCookieFlag: false
      };

    case FAILURE_SIGNING_OUT:
      return {
        ...state,
        ...action.user,
        isSigningOut: false
      };

    case BEGIN_CONFIRMING_ACCOUNT:
      return {
        ...state,
        isConfirmingAccount: true
      };

    case SUCCESS_CONFIRMING_ACCOUNT:
      return {
        ...state,
        isConfirmingAccount: false,
        accountConfirmed: true
      };

    case FAILURE_CONFIRMING_ACCOUNT:
      return {
        ...state,
        isConfirmingAccount: false,
        accountConfirmed: false,
        accountConfirmationError: {
          ...state,
          ...state.accountConfirmationError,
          ...action.payload.error // should be .errors ?
        }
      };

    case SET_CONFIRM_COOKIE_FLAG:
      return {
        ...state,
        confirmedCookieFlag: true
      };

    case BEGIN_CONFIRM_24_HOUR_MEAL_RESET:
      //console.log(`[userReducers] BEGIN_CONFIRM_24_HOUR_MEAL_RESET`);
      return {
        ...state,
        isConfirming24HourMealResetMessage: true
      };

    case SUCCESS_CONFIRMING_24_HOUR_MEAL_RESET:
      //console.log(`[userReducers] SUCCESS_CONFIRMING_24_HOUR_MEAL_RESET`);
      return {
        ...state,
        confirmed24HourMealResetMessage: true,
        isConfirming24HourMealResetMessage: false
      };

    case FAILURE_CONFIRMING_24_HOUR_MEAL_RESET:
      return {
        ...state,
        confirmed24HourMealResetMessage: false,
        isConfirming24HourMealResetMessage: false,
        confirm24HourMealResetMessageErrors: [...action.payload.errors]
      };

    case BEGIN_PASSWORD_RESET:
      return {
        ...state,
        isSendingResetPasswordEmail: true
      };

    case SUCCESS_PASSWORD_RESET:
      return {
        ...state,
        isSendingResetPasswordEmail: false,
        resetPasswordEmailSent: true
      };

    case FAILURE_PASSWORD_RESET:
      return {
        ...state,
        isSendingResetPasswordEmail: false,
        resetPasswordEmailSent: false
      };

    case SET_FORM_ERROR:
      return {
        ...state,
        formErrorText: action.payload.error
      };

    default:
      return { ...state };
  }
};
