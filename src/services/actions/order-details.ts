import { TResponseDataAPI, request } from "../../utils/connector";
import { getTokens } from "../../utils/persistant-token";
import { IIngredient } from "../../utils/types";

export const SET_ORDER_ID = "SET_ORDER_ID";
export const SET_ERROR = "SET_ERROR";
export const RESET_ORDER_ID = "RESET_ORDER_ID";

export const setOrderId = (orderId: number) => ({
  type: SET_ORDER_ID,
  payload: orderId,
});

export const setError = (error: string | null) => ({
  type: SET_ERROR,
  payload: error,
});

export const resetOrderId = () => ({
  type: RESET_ORDER_ID,
});

export const getOrderId = (ingredients: IIngredient) => async (dispatch: any) => {
  try {
    const response = await request<TResponseDataAPI<{order: {number: number}}>>("orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": getTokens().accessToken,
      },
      body: JSON.stringify({
        ingredients: ingredients,
      }),
    });

    dispatch(setOrderId(response.order.number));
    dispatch(setError(null));
  } catch (err: any) {
    dispatch(setError(err?.message || err?.toString() || "Неизвестная ошибка !!"));
  }
};