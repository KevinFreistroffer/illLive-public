// import cookies from "my-simple-cookie";
import configs from "../configs";
import { store } from "../store";
import cookie from "my-simple-cookie";

// I'm trying to delete a cookie. My Simple Cookie isn't deleting it
// so express session's cookie creation must be setting it strangely or something.

// export const setToken = (token) => {
// 	console.log(`[Auth utilities] setToken()`);
// 	cookies.set('x-auth-token', token, { expires: configs.tokenTimeout * 60, domain: configs.domain } );
// }

export const getSessionID = () => {
  return cookie.get("user_sid");
};

export const removeSessionID = () => {
  cookie.remove("user_sid");
};

export const getUser = () => {
  if (
    store.auth &&
    store.auth.user &&
    store.auth.user.hasOwnProperty("email")
  ) {
    return store.auth.user;
    // TODO refactor
  } else if (getSessionID() && getSessionID() !== "") {
    return cookie(`${configs.apiUrl}/auth/getUser`, {
      headers: getSessionID()
    });
  }
};

// export const isValidEmail = email => {
//   return email.match(EMAIL_REGEX);
// };
