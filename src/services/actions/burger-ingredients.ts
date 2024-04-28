import { TResponseDataAPI, request } from "../../utils/connector";
import { IIngredient } from "../../utils/types";
import { AppDispatch } from "../reducers";

export const GET_INGREDIENTS_REQUEST: "GET_INGREDIENTS_REQUEST" =
  "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS" =
  "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED" =
  "GET_INGREDIENTS_FAILED";

export interface IGetIngredientsAction {
  (): (dispatch: AppDispatch) => Promise<void>;
}

export type TBurgerIngredientsActions = IGetIngredientsAction;

export const getIngredients: IGetIngredientsAction = () => async (dispatch) => {
  dispatch({
    type: GET_INGREDIENTS_REQUEST,
  });

  request<TResponseDataAPI<{ data: IIngredient[] }>>("ingredients")
    .then((response) => {
      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        ingredients: response?.data,
      });
    })
    .catch((err: any) => {
      dispatch({
        type: GET_INGREDIENTS_FAILED,
        payload: err,
      });
    });
};
