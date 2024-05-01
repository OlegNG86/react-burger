import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";
import { compose, createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { Provider } from "react-redux";
import { rootReducer } from "./services/reducers";
import { BrowserRouter } from "react-router-dom";

const composeEnhancers =
  window instanceof Object &&
  typeof window === "object" &&
  "__REDUX_SOME" in window &&
  typeof window.__REDUX_SOME === "function"
    ? window.__REDUX_SOME({})
    : compose();

// Создаем расширитель хранилища с использованием middleware
const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(rootReducer, enhancer);

const container = document.getElementById("root");
if (!container) throw new Error("React container-element not found");
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
