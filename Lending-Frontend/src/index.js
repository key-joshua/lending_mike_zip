import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reducer from "./redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import App from "./App";
import { Provider } from "react-redux";

const store = createStore(reducer, applyMiddleware(thunk));
ReactDOM.render(
  <React.Fragment>
    <Provider store={store}>
      <App />
    </Provider>
  </React.Fragment>,
  document.getElementById("root")
);
