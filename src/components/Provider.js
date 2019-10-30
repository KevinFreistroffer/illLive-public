import React, { Component } from "react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { store } from "../store";
import { saveState } from "../utilities/store";
import { debounce } from "../utilities/subscribe";
import App from "./App";

export const history = createBrowserHistory();

store.subscribe(
  debounce(() => {
    saveState(store.getState());
  }, 1000)
);

export class ProviderComponent extends Component {
  render() {    
    return (
      <Provider store={store  }>
            <Router
                history={history}>
          <App />
        </Router>
      </Provider>      
    );
  }
}

export default ProviderComponent;
