import { TResponseDataAPI, request } from "../../utils/connector";
import { getTokens } from "../../utils/persistant-token";
import { IIngredient } from "../../utils/types";
import { AppDispatch } from "../reducers";

export const SET_ORDER_ID: "SET_ORDER_ID" = "SET_ORDER_ID";
export const SET_ERROR: "SET_ERROR" = "SET_ERROR";
export const RESET_ORDER_ID: "RESET_ORDER_ID" = "RESET_ORDER_ID";

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
  (ingredients: IIngredient): (dispatch: AppDispatch) => Promise<void>;
}

export type TOrderDetailsActions =
  | ReturnType<ISetOrderIdAction>
  | ReturnType<ISetErrorAction>
  | ReturnType<IResetOrderIdAction>;

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
    } catch (err: any) {
      dispatch(
        setError(err?.message || err?.toString() || "Неизвестная ошибка !!")
      );
    }
  };
