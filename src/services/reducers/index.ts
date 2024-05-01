import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import burgerIngredientsReducer from "./burger-ingredients";
import burgerConstructorReducer from "./burger-constructor";
import { modalReducer } from "./modal";
import orderReducer from "./order-details";
import authorizationReducer from "./authorization";
import userReducer from "./user";
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { TAuthorizationActions } from "../actions/authorization";
import { TBurgerConstructorActions } from "../actions/burger-constructor";
import { TBurgerIngredientsActions } from "../actions/burger-ingredients";
import { TModalActions } from "../actions/modal";
import { TOrderDetailsActions } from "../actions/order-details";
import { TUserActions } from "../actions/user";

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


// Типизация всех экшенов приложения
type TApplicationActions =
  | TAuthorizationActions
  | TBurgerConstructorActions
  | TBurgerIngredientsActions
  | TModalActions
  | TOrderDetailsActions
  | TUserActions;

  // Типизация thunk'ов в нашем приложении
export type AppThunk<TReturn = void> = ActionCreator<
ThunkAction<TReturn, Action, RootState, TApplicationActions>
>; 

// Типизация метода dispatch для проверки на валидность отправляемого экшена
export type AppDispatch = typeof store.dispatch;