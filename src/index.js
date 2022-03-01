import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./components/app/App";
import reportWebVitals from "./reportWebVitals";
const apiKey = "38fb68262a1dad15193eb72bff90089d";
ReactDOM.render(
  <React.StrictMode>
    <App apiKey={apiKey} />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
