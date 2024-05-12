import { fetchWithRefresh } from "../../utils/connector";
import { getTokens } from "../../utils/persistant-token";
import { convertErrorResponseToString } from "../../utils/common";
import { TForm, TProfileAuthorizationState } from "../../utils/types";
import { AppDispatch } from "../reducers";

export const GET_USER_DATA_REQUEST: "GET_USER_DATA_REQUEST" = "GET_USER_DATA_REQUEST";
export const GET_USER_DATA_SUCCESS: "GET_USER_DATA_SUCCESS" = "GET_USER_DATA_SUCCESS";
export const GET_USER_DATA_FAILURE: "GET_USER_DATA_FAILURE" = "GET_USER_DATA_FAILURE";

export const UPDATE_USER_DATA_REQUEST: "UPDATE_USER_DATA_REQUEST" = "UPDATE_USER_DATA_REQUEST";
export const UPDATE_USER_DATA_SUCCESS: "UPDATE_USER_DATA_SUCCESS" = "UPDATE_USER_DATA_SUCCESS";
export const UPDATE_USER_DATA_FAILURE: "UPDATE_USER_DATA_FAILURE" = "UPDATE_USER_DATA_FAILURE";

export interface IGetUserDataAction {
  (): (dispatch: AppDispatch) => Promise<void>;
}

export interface IUpdateUserDataAction {
  (userData: TForm): (dispatch: AppDispatch) => Promise<void>;
}

export interface IGetUserDataRequestAction {
  readonly type: typeof GET_USER_DATA_REQUEST;  
}

export interface IGetUserDataSuccessAction {
  readonly type: typeof GET_USER_DATA_SUCCESS;  
  payload: TProfileAuthorizationState;
}

export interface IGetUserDataFailureAction {
  readonly type: typeof GET_USER_DATA_FAILURE;  
  payload: string;
}

export interface IUpdateUserDataRequestAction {
  readonly type: typeof UPDATE_USER_DATA_REQUEST;  
}

export interface IUpdateUserDataSuccessAction {
  readonly type: typeof UPDATE_USER_DATA_SUCCESS;  
  payload: TProfileAuthorizationState;
}

export interface IUpdateUserDataFailureAction {
  readonly type: typeof UPDATE_USER_DATA_FAILURE;  
  payload: string;
}

export type TUserActions =
  | IGetUserDataRequestAction
  | IGetUserDataSuccessAction
  | IGetUserDataFailureAction
  | IUpdateUserDataRequestAction
  | IUpdateUserDataSuccessAction
  | IUpdateUserDataFailureAction;

export const getUserData: IGetUserDataAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_DATA_REQUEST });
    const accessToken = getTokens().accessToken;
    if (accessToken) {
      const response = await fetchWithRefresh("auth/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: accessToken,
        },
      });

      dispatch({
        type: GET_USER_DATA_SUCCESS,
        payload: response.user,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_USER_DATA_FAILURE,
      payload: convertErrorResponseToString(error),
    });
  }
};

export const updateUserData: IUpdateUserDataAction = (userData) => async (dispatch) => {
  try {
    const accessToken = getTokens().accessToken;
    if (accessToken) {
      dispatch({ type: UPDATE_USER_DATA_REQUEST });

      const response = await fetchWithRefresh("auth/user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: accessToken,
        },
        body: JSON.stringify(userData),
      });

      dispatch({
        type: UPDATE_USER_DATA_SUCCESS,
        payload: response.user,
      });
    }
  } catch (error) {
    dispatch({
      type: UPDATE_USER_DATA_FAILURE,
      payload: convertErrorResponseToString(error),
    });
  }
};
