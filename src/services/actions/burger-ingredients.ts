import { TResponseDataAPI, request } from "../../utils/connector";
import { IIngredient } from "../../utils/types";
import { AppDispatch } from "../reducers";
import { convertErrorResponseToString } from "../../utils/common";

export const GET_INGREDIENTS_REQUEST: "GET_INGREDIENTS_REQUEST" =
  "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS" =
  "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED" =
  "GET_INGREDIENTS_FAILED";

export interface IGetIngredientsAction {
  (): (dispatch: AppDispatch) => Promise<void>;
}

export interface IGetIngredientsRequestAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  ingredients: IIngredient[]
}

export interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
  payload: string;
}

export type TBurgerIngredientsActions =
  | IGetIngredientsRequestAction
  | IGetIngredientsSuccessAction
  | IGetIngredientsFailedAction;

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
    .catch((err) => {
      dispatch({
        type: GET_INGREDIENTS_FAILED,
        payload: convertErrorResponseToString(err),
      });
    });
};
