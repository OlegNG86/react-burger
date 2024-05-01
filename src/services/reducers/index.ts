import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import burgerIngredientsReducer from "./burger-ingredients";
import burgerConstructorReducer from "./burger-constructor";
import { modalReducer } from "./modal";
import orderReducer from "./order-details";
import authorizationReducer from "./authorization";
import userReducer from "./user";

export const rootReducer = combineReducers({
  ingredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  modal: modalReducer,
  order: orderReducer,
  authorization: authorizationReducer,
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

// export type RootState = ReturnType<typeof store.getState>; изначальная типизация стора
export type RootState = ReturnType<typeof rootReducer>; //вариант от наставника
export type AppDispatch = typeof store.dispatch;
