import { SET_LOADER } from './types';

const initialState = {
  isLoading: false,
  loadingText: ''
};

export let loadingReducers = (state = initialState, action) => {

  switch(action.type) {

    case SET_LOADER:
      return {
        isLoading: action.isLoading,
        loadingText: action.loadingText,
        showSpinner: action.showSpinner
      }

    default:
      return state;

  }
};
