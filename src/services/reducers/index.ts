import { combineReducers, createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import burgerIngredientsReducer from "./burger-ingredients";
import burgerConstructorReducer from "./burger-constructor";
import { modalReducer } from "./modal";
import orderReducer from "./order-details";
import authorizationReducer from "./authorization";
import userReducer from "./user";
import { ThunkAction, thunk } from "redux-thunk";
import { Action, ActionCreator } from "redux";
import { TAuthorizationActions } from "../actions/authorization";
import { TBurgerConstructorActions } from "../actions/burger-constructor";
import { TBurgerIngredientsActions } from "../actions/burger-ingredients";
import { TModalActions } from "../actions/modal";
import { TOrderDetailsActions } from "../actions/order-details";
import { TUserActions } from "../actions/user";
import { socketMiddleware } from "../middleware/socket-middleware";
import { TFeedActions, feedWsActions } from "../actions/feed";
import { feedReducer } from "./feed";
import thunkMiddleware from "redux-thunk";
import { ordersReducer } from "./orders";
import { ordersWsActions } from "../actions/orders";

export const rootReducer = combineReducers({
  ingredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  modal: modalReducer,
  order: orderReducer,
  authorization: authorizationReducer,
  user: userReducer,
  feed: feedReducer,
  orders: ordersReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      socketMiddleware(feedWsActions),
      socketMiddleware(ordersWsActions)
    ),
  devTools: true,
});

// export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

// export type RootState = ReturnType<typeof store.getState>; // изначальная типизация стора
export type RootState = ReturnType<typeof rootReducer>; // вариант от наставника

// Типизация всех экшенов приложения
export type TApplicationActions =
  | TAuthorizationActions
  | TBurgerConstructorActions
  | TBurgerIngredientsActions
  | TModalActions
  | TOrderDetailsActions
  | TUserActions
  | TFeedActions;

// Типизация thunk'ов в нашем приложении
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

// Типизация метода dispatch для проверки на валидность отправляемого экшена
export type AppDispatch = typeof store.dispatch;

function applyMiddleware(
  thunk: any
):
  | Partial<{
      ingredients: never;
      burgerConstructor: never;
      modal: never;
      order: never;
      authorization: never;
      user: never;
    }>
  | undefined {
  throw new Error("Function not implemented.");
}
