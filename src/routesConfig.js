import Home from "./routes/home";
import Register from "./routes/register";
import SignIn from "./routes/signin";
import CreateProfileAfterRegister from "./routes/create";
import Dashboard from "./routes/Dashboard";
import NewConsumable from "./routes/new-consumable";
import EditConsumable from "./routes/edit-consumable";
import TodaysTotals from "./routes/todays-totals";
import Consumed from "./routes/Consumed";
import MakeAMeal from "./routes/make-a-meal";
import PageNotFound from "./routes/404";
import Account from "./routes/Account";
import ResetPassword from "./routes/reset-password";
import ConfirmResetPasswordToken from "./routes/confirm-reset-password-token";

export const notAuthenticatedRoutes = [
  {
    name: "Home",
    path: "/",
    component: Home
  },
  {
    name: "Register",
    path: "/register",
    component: Register
  },
  {
    name: "Sign In",
    path: "/signin",
    component: SignIn
  },
  {
    name: "Intro Profile",
    path: "/intro-profile",
    component: CreateProfileAfterRegister
  },
  {
    name: "Reset Password",
    path: "/reset-password",
    component: ResetPassword
  }
];

export const footerRoutes = [
  {
    name: "Home",
    path: "/",
    component: Home
  },
  {
    name: "Dashboard",
    path: "/dashboard",
    component: Home
  },
  {
    name: "Todays totals",
    path: "/totals",
    component: TodaysTotals
  },
  {
    name: "Make a meal",
    path: "/totals",
    component: MakeAMeal
  }
];

export const authenticatedRoutes = [
  {
    name: "Home",
    path: "/",
    component: Home
  },
  // {
  //   name: 'Search',
  //   path: '/search',
  //   component: Search
  // },
  {
    name: "Dashboard",
    path: "/dashboard",
    component: Dashboard
  },
  {
    name: "Totals",
    path: "/totals",
    component: TodaysTotals
  },
  {
    name: "Make A Meal",
    path: "/make-a-meal",
    component: MakeAMeal
  },

  // {
  //   name: 'Details',
  //   path: '/totals/details',
  //   component: Details
  // },
  // {
  //   name: 'Vitamins',
  //   path: '/dashboard/totals/vitamins',
  //   component: Vitamins
  // },
  {
    name: "Add",
    path: "/dd",
    component: NewConsumable
  },
  {
    name: "Edit",
    path: "/edit",
    component: EditConsumable
  },
  {
    name: "Consumed",
    path: "/consumed",
    component: Consumed
  },
  {
    name: "Account",
    path: "/account",
    component: Account
  },
  {
    name: "Reset Password",
    path: "/reset-password",
    component: ResetPassword
  }
];
