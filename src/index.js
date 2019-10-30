import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import ProviderComponent from "./components/Provider";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<ProviderComponent />, document.getElementById("root"));
registerServiceWorker();
