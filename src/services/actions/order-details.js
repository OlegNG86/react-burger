import { request } from "../../utils/connector";

export const SET_ORDER_ID = "SET_ORDER_ID";
export const SET_ERROR = "SET_ERROR";
export const RESET_ORDER_ID = "RESET_ORDER_ID";

export const setOrderId = (orderId) => ({
  type: SET_ORDER_ID,
  payload: orderId,
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});

export const resetOrderId = () => ({
  type: RESET_ORDER_ID,
});

export const getOrderId = (ingredients) => async (dispatch) => {
  try {
    const response = await request("orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients: ingredients }),
    });

    dispatch(setOrderId(response.order.number));
    dispatch(setError(null));
  } catch (err) {
    dispatch(setError(err.message));
  }
};
