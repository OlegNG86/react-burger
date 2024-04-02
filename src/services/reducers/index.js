import { combineReducers } from "redux";
import burgerIngredientsReducer from "./burger-ingredients";
import burgerConstructorReducer from "./burger-constructor";
import { modalReducer } from "./modal";
import orderReducer from "./order-details";
import authorizationReducer from "./authorization";

export const rootReducer = combineReducers({
  ingredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  modal: modalReducer,
  order: orderReducer,
  authorization: authorizationReducer,
});
