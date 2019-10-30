import { TOGGLE_MENU } from "../actions/types";

const initialState = {
  menuOpen: false
};

export const menuReducers = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MENU:
      return {
        menuOpen: !state.menuOpen
      };
    default:
      return { ...state };
  }
};
