import {
  BEGIN_STORING_USER,
  STORE_USER,
  STORE_AUTHENTICATION_TOKEN,
  STORE_API_TOKEN,
  BEGIN_SIGNING_IN,
  SUCCESS_SIGNING_IN,
  FAILURE_SIGNING_IN,
  BEGIN_SIGNING_UP,
  SUCCESS_SIGNING_UP,
  FAILURE_SIGNING_UP,
  RESET_IS_SIGNED_UP,
  BEGIN_SIGNING_OUT,
  SUCCESS_SIGNING_OUT,
  FAILURE_SIGNING_OUT,
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
} from "./types";
import {
  authenticateUser, // TODO rename to match other requests
  sendConfirmAccountRequest,
  signIn as sendSignInRequest,
  signUp as sendSignUpRequest,
  signOut as sendSignOutRequest,
  sendConfirm24HourMealResetRequest,
  sendResetPasswordEmailRequest
} from "../services/user.service";
import {
  deleteStoreState
} from "../utilities/store";
import {
  addToLocalStorage,
  clearLocalStorage
} from "../utilities/localStorage";
import {
  setLoader
} from "./loading.actions";
import Axios from "axios";

// Store user in Global Store
// TODO rename as addUserToStore
export let beginStoringUser = user => {
  //console.log(`beginStoringUser`, user);
  return function (dispatch) {
    dispatch(setUser(user));

    return {
      type: BEGIN_STORING_USER
    };
  };
};

export let setUser = user => {
  //console.log(`setUser()`);
  return {
    type: STORE_USER,
    payload: {
      user
    }
  };
};

// Authenticate
// TODO rename. What is authenticating?
// authenticatingUserByCookieSession
export let beginAuthenticating = () => {
  return {
    type: BEGIN_AUTHENTICATING
  };
};

export let authenticate = () => {
  //console.log(`authenticate`);
  return async function (dispatch, getState) {
    dispatch(beginAuthenticating());

    try {
      const authenticationResponse = await authenticateUser();
      //console.log(authenticationResponse);
      if (authenticationResponse.status === 401) {
        dispatch(failureAuthenticating(authenticationResponse.data.data));
      } else if (authenticationResponse.status === 200) {
        dispatch(successAuthenticating(authenticationResponse.data.data));
      }
    } catch (error) {
      dispatch(failureAuthenticating(error));
    }
  };
};

export let successAuthenticating = user => {
  return function (dispatch) {
    dispatch(setUser(user));

    if (user.meals && user.meals.length > 0) {
      addToLocalStorage("meals", user.meals);
    }

    return dispatch({
      type: SUCCESS_AUTHENTICATING
    });
  };
};

export let failureAuthenticating = errors => {
  return {
    type: FAILURE_AUTHENTICATING,
    payload: {
      errors
    }
  };
};

// Store Authentication Token
export let storeAuthenticationToken = token => {
  return {
    type: STORE_AUTHENTICATION_TOKEN,
    token
  };
};

// Store Account Confirmation Token
export let storeAccountConfirmationToken = token => {
  return {
    type: STORE_AUTHENTICATION_TOKEN,
    token
  };
};

// Store API Token
export let storeApiToken = token => {
  return {
    type: STORE_API_TOKEN,
    token
  };
};

// Register a new user
export let beginSigningUp = body => {
  console.log(`[action] beginSigningUp`, body);
  return function (dispatch) {
    dispatch(signUp(body));

    return dispatch({
      type: BEGIN_SIGNING_UP
    });
  };
};

export let signUp = body => {
  return async function (dispatch) {
    console.log(`[action] signUp`, body);
    try {
      const signUpResponse = await sendSignUpRequest(body);
      console.log(signUpResponse);
      if (signUpResponse.data.success) {
        dispatch(successSigningUp());
      } else {
        console.log(signUpResponse);
        dispatch(failureSigningUp(signUpResponse.data.data));
      }
    } catch (error) {
      console.log(
        `Try Catch error block error. Also an error occured in signUp()`,
        error
      );
      dispatch(failureSigningUp(error));
    }
  };
};


export let successSigningUp = user => {
  return function (dispatch) {
    console.log(`[action] successSigningUp`);
    // Is this required?
    // dispatch(setUser(user));
    return dispatch({
      type: SUCCESS_SIGNING_UP
    });
  };
};

export let failureSigningUp = errors => {
  console.log(`[action] failureSigningUp`, errors);
  return {
    type: FAILURE_SIGNING_UP,
    payload: {
      errors
    }
  };
};

export let resetIsSignedUp = () => {
  return {
    type: RESET_IS_SIGNED_UP
  };
};

// Signing in
export let beginSigningIn = credentials => {
  console.log(`beginSigningIn`);
  return function (dispatch) {
    dispatch(signIn(credentials));

    dispatch({
      type: BEGIN_SIGNING_IN,
      payload: {
        isSigningIn: true
      }
    });
  };
};

// on unsucessfull sign in
// set error message in actions error messages
// display error messages from props

export let signIn = credentials => {
  console.log(`signIn`);
  return async function (dispatch) {
    sendSignInRequest(credentials)
      .then(response => {
        console.log(`response`, response);
        if (response.status === 200) {
          dispatch(successSigningIn(response.data.data));
        } else {
          console.log(`response.  `, response.status);
          setTimeout(() => {
            dispatch(failureSigningIn(response.data.data));
          }, 5000);
        }
      })
      .catch(error => {
        // TODO handle if the error returns not the expected response object
        if (error && error.response && error.response.data) {
          dispatch(failureSigningIn(error.response.data.data));
        } else {
          dispatch(failureSigningIn("An error occured. Please try again."));
        }
      });
  };
};

export let successSigningIn = user => {
  console.log(`successSigningIn`);
  return function (dispatch) {
    dispatch(setUser(user));

    if (user.meals && user.meals.length > 0) {
      addToLocalStorage("meals", user.meals);
    }

    dispatch({
      type: SUCCESS_SIGNING_IN
    });
  };
};

export let failureSigningIn = error => {
  console.log(`[userActions] failureSigningIn()`, error);
  return function (dispatch, getState) {
    return dispatch({
      type: FAILURE_SIGNING_IN,
      payload: {
        error
      }
    });
  };
};

// Signing out
export let beginSigningOut = () => {
  return function (dispatch) {
    dispatch(signOut());

    return dispatch({
      type: BEGIN_SIGNING_OUT,
      payload: {
        isSigningOut: true
      }
    });
  };
};

export let signOut = () => {
  return async function (dispatch) {
    deleteStoreState();
    clearLocalStorage();

    const response = await sendSignOutRequest();

    if (response.status === 200) {
      dispatch(successSigningOut(response.data));
    } else {
      dispatch(failureSigningOut(response.data));
    }
  };
};

export let successSigningOut = success => {
  return {
    type: SUCCESS_SIGNING_OUT
  };
};

export let failureSigningOut = errors => {
  return {
    type: FAILURE_SIGNING_OUT
  };
};

// Confirm account
export let beginConfirmingAccount = token => {
  return function (dispatch) {
    dispatch(confirmAccount(token));

    return dispatch({
      type: BEGIN_CONFIRMING_ACCOUNT
    });
  };
};

export let confirmAccount = token => {
  return function (dispatch) {
    sendConfirmAccountRequest(token)
      .then(response => {
        const {
          invalidToken,
          tokenExpired
        } = response.data;
        let errorObj = {};

        if (response.status === (401 || 422)) {
          errorObj["invalidToken"] = invalidToken;
          errorObj["tokenExpired"] = tokenExpired;
          dispatch(failureConfirmingAccount(errorObj));
        } else if (response.status === 201) {
          dispatch(successConfirmingAccount());
        }
      })
      .catch(error => {
        console.warn(
          "[ConfirmAccount] error POSTing auth/resend-confirmation",
          error
        );
        dispatch(failureConfirmingAccount(error));
      });
  };
};

export let successConfirmingAccount = () => {
  return {
    type: SUCCESS_CONFIRMING_ACCOUNT
  };
};

export let failureConfirmingAccount = error => {
  return {
    type: FAILURE_CONFIRMING_ACCOUNT,
    payload: {
      error
    }
  };
};

// Conform cookie flag
export let setConfirmCookieFlag = () => {
  return {
    type: SET_CONFIRM_COOKIE_FLAG
  };
};

export let beginConfirm24HourMealResetMessage = () => {
  //console.log(`[userActions] beginConfirmingAccount()`);
  return function (dispatch) {
    dispatch(confirm24HourMealResetMessage());

    return dispatch({
      type: BEGIN_CONFIRM_24_HOUR_MEAL_RESET
    });
  };
};

export let confirm24HourMealResetMessage = () => {
  return function (dispatch) {
    sendConfirm24HourMealResetRequest()
      .then(response => {
        //console.log(response);
        if (response.status === 200) {
          dispatch(successConfirm24HourMealResetMessage(response.data.data));
        } else {
          //console.log(`failureConfirm24HourMealResetMessage`, response.data);
          dispatch(failureConfirm24HourMealResetMessage(response.data.errors));
        }
      })
      .catch(error => {
        //console.log(error);
        //dispatch(failureConfirm24HourMealResetMessage(error));
      });
  };
};

export let successConfirm24HourMealResetMessage = () => {
  //console.log(`[userActions] successConfirm24HourMealResetMessage`);
  return {
    type: SUCCESS_CONFIRMING_24_HOUR_MEAL_RESET
  };
};

export let failureConfirm24HourMealResetMessage = errors => {
  return {
    type: FAILURE_CONFIRMING_24_HOUR_MEAL_RESET,
    payload: {
      errors
    }
  };
};

export let beginPasswordReset = email => {
  return function (dispatch) {
    console.log(`beginPasswordRecovery`);
    dispatch(sendResetPasswordEmail(email));

    return dispatch({
      type: BEGIN_PASSWORD_RESET
    });
  };
};

export let sendResetPasswordEmail = email => {
  return function (dispatch) {
    console.log(`sendPasswordRecoveryEmail`);
    sendResetPasswordEmailRequest(email).then(
      response => {
        console.log(response);
        setTimeout(() => {
          dispatch(successPasswordReset());
        }, 3800);
      },
      error => {
        console.log(`An error occured sending password recovery email`, error);
        setTimeout(() => {
          dispatch(failurePasswordReset());
        }, 3800);
      }
    );
  };
};

export let successPasswordReset = () => {
  console.log(`successPasswordReset`);
  return {
    type: SUCCESS_PASSWORD_RESET
  };
};

export let failurePasswordReset = () => {
  console.log(`failurePasswordRecovery`);
  return {
    type: FAILURE_PASSWORD_RESET
  };
};

// can call this action from anywhere. if errors is an empty array, clear errors, otherwise
// ... spread
// on route change is not signin or register, clear errors array.

export let setFormError = error => {
  console.log(`setFormError`);
  return {
    type: SET_FORM_ERROR,
    payload: {
      error
    }
  };
};