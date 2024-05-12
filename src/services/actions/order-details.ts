import { TResponseDataAPI, request } from "../../utils/connector";
import { getTokens } from "../../utils/persistant-token";
import { IIngredient, TOrder } from "../../utils/types";
import { AppDispatch } from "../reducers";
import { convertErrorResponseToString } from "../../utils/common";

export const SET_ORDER_ID: "SET_ORDER_ID" = "SET_ORDER_ID";
export const SET_ERROR: "SET_ERROR" = "SET_ERROR";
export const RESET_ORDER_ID: "RESET_ORDER_ID" = "RESET_ORDER_ID";
export const GET_ORDER_OBJECT_REQUEST: "GET_ORDER_OBJECT_REQUEST" =
  "GET_ORDER_OBJECT_REQUEST";
export const GET_ORDER_OBJECT_SUCCESS: "GET_ORDER_OBJECT_SUCCESS" =
  "GET_ORDER_OBJECT_SUCCESS";
export const GET_ORDER_OBJECT_FAILED: "GET_ORDER_OBJECT_FAILED" =
  "GET_ORDER_OBJECT_FAILED";

export interface ISetOrderIdAction {
  (orderId: number): { type: typeof SET_ORDER_ID; payload: number };
}

export interface ISetErrorAction {
  (error: string | null): { type: typeof SET_ERROR; payload: string | null };
}

export interface IResetOrderIdAction {
  (): { type: typeof RESET_ORDER_ID };
}

export interface IGetOrderIdAction {
  (ingredients: string[]): (dispatch: AppDispatch) => Promise<void>;
}

export interface IGetOrderObjectAction {
  (orderId: number): (dispatch: AppDispatch) => Promise<void>;
}

export interface IGetOrderObjectRequestAction {
  readonly type: typeof GET_ORDER_OBJECT_REQUEST;
}

export interface IGetOrderObjectSuccessAction {
  readonly type: typeof GET_ORDER_OBJECT_SUCCESS;
  orderObject: TOrder[];
}

export interface IGetOrderObjectFailedAction {
  readonly type: typeof GET_ORDER_OBJECT_FAILED;
  payload: string;
}

export type TOrderDetailsActions =
  | ReturnType<ISetOrderIdAction>
  | ReturnType<ISetErrorAction>
  | ReturnType<IResetOrderIdAction>
  | IGetOrderObjectRequestAction
  | IGetOrderObjectSuccessAction
  | IGetOrderObjectFailedAction;

export const setOrderId: ISetOrderIdAction = (orderId) => ({
  type: SET_ORDER_ID,
  payload: orderId,
});

export const setError: ISetErrorAction = (error) => ({
  type: SET_ERROR,
  payload: error,
});

export const resetOrderId: IResetOrderIdAction = () => ({
  type: RESET_ORDER_ID,
});

export const getOrderId: IGetOrderIdAction =
  (ingredients) => async (dispatch) => {
    try {
      const response = await request<
        TResponseDataAPI<{ order: { number: number } }>
      >("orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: getTokens().accessToken,
        },
        body: JSON.stringify({
          ingredients: ingredients,
        }),
      });

      dispatch(setOrderId(response.order.number));
      dispatch(setError(null));
    } catch (err) {
      dispatch(setError(convertErrorResponseToString(err)));
    }
  };

export const getOrderObject: IGetOrderObjectAction =
  (orderId: number) => async (dispatch) => {
    dispatch({
      type: GET_ORDER_OBJECT_REQUEST,
    });

    request<TResponseDataAPI<{ orders: TOrder[] }>>(`orders/${orderId}`)
      .then((response) => {
        dispatch({
          type: GET_ORDER_OBJECT_SUCCESS,
          orderObject: response.orders,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_ORDER_OBJECT_FAILED,
          payload: convertErrorResponseToString(err),
        });
      });
  };
