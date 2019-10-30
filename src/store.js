import { createStore, applyMiddleware, combineReducers } from 'redux';
import Thunk from 'redux-thunk';
import { appReducers } from './reducers/app.reducers';
import { loadingReducers } from './reducers/loading.reducers';
import { userReducers } from './reducers/user.reducers';
import { dashboardReducers } from './reducers/dashboard.reducers';
import { menuReducers } from './reducers/menu.reducers';
import { alertReducers } from './reducers/alert.reducers';
import { detailsReducers } from './reducers/details.reducers';
import { stayBoxReducers } from './reducers/staybox.reducers';
import { totalsReducers } from './reducers/totals.reducers';
import { loadState, saveState } from './utilities/store';

const rootReducer = combineReducers({
  appReducers,
  userReducers,
  dashboardReducers,
  loadingReducers,
  menuReducers,
  alertReducers,
  detailsReducers,
  stayBoxReducers,
  totalsReducers
});


export const persistedState = loadState();
export const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(Thunk)
);


const debounce = (func, wait, immediate) => {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};
  
store.subscribe(debounce(() => {
  saveState(store.getState());
}, 1000));


