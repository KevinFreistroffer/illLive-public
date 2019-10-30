import { SET_STAY_BOX } from '../actions/types';

const initialState = {
  isVisible: false,
  text: ''
};

export let stayBoxReducers = (state = initialState, action) => {

  switch(action.type) {

    case SET_STAY_BOX:     
      return {
        ...state,
        ...action.payload
      }

    default:
      return state;
  }
};
