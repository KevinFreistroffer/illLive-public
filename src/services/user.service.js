import axios from "axios";
import configs from "../configs";
import { removeSessionID } from "../utilities/auth";

// TODO either rename as sendAuthenticateUserRequest,
//      or change the  name of the other functions to not being ***request.
export const authenticateUser = () => {
  return axios(`${configs.apiUrl}/auth/authenticate`, {
    withCredentials: true
  });
};

export const signIn = ({ login, password, rememberMe }) => {
  return axios(`${configs.apiUrl}/auth/signin`, {
    method: "post",
    withCredentials: true,
    headers: { "Content-type": "application/json" },
    data: { login, password, rememberMe }
  });
};

export const signUp = ({ username, email, password }) => {
  return axios(`${configs.apiUrl}/auth/signup`, {
    method: "post",
    headers: { "Content-type": "application/json" },
    data: { username, email, password }
  });
};

export const signOut = () => {
  // Dispatch an action that clears the sessionID
  // Dispatch an action that clears the user - might be part of the signOut action creatoer
  // Dispatch an action to the server signout
  // The larger picture is this removes anything related to the user
  // So Christian signs into the account with his username and password, and signs out
  // and it clears the redux stores user, the cookie stored values and the server
  // clears the session values. clean slate.

  // again, display a message to the user that they're signed out
  // So anyways
  removeSessionID();

  return axios(`${configs.apiUrl}/auth/signout`);
};

export const sendConfirmAccountRequest = token => {
  return axios(`${configs.apiUrl}/auth/confirm-account/${token}`);
};

// Should be /auth
export const setProfileAfterSignUp = body => {
  return axios.post(`${configs.apiUrl}/user/profile-after-signup`, {
    method: "POST",
    withCredentials: true,
    headers: { "Content-type": "application/json" },
    data: { body }
  });
};

export const sendConfirm24HourMealResetRequest = () => {
  return axios(`${configs.apiUrl}/auth/confirm-24-hour-meal-reset`, {
    withCredentials: true
  });
};

export const sendResetPasswordEmailRequest = email => {
  console.log(`sendResetPasswordEmailRequest email`, email);
  return axios(`${configs.apiUrl}/auth/reset-password-email`, {
    method: "POST",
    withCredentials: true,
    data: {
      email
    }
  });
};

export const confirmResetPasswordToken = token => {
  console.log(`confirmResetPasswordToken token`, token);
  return axios(`${configs.apiUrl}/auth/confirm-reset-password-token/${token}`, {
    withCredentials: true
  });
};
