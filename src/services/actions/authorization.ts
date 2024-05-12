import { TResponseDataAPI, request } from "../../utils/connector";
import { setTokens } from "../../utils/persistant-token";
import { TProfileAuthorizationState } from "../../utils/types";
import { AppDispatch } from "../reducers";

export const SET_USER_DATA: "SET_USER_DATA" = "SET_USER_DATA";
export const FETCH_USER_DATA: "FETCH_USER_DATA" = "FETCH_USER_DATA";
export const RESET_PASSWORD_SUCCESS: "RESET_PASSWORD_SUCCESS" =
  "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILURE: "RESET_PASSWORD_FAILURE" =
  "RESET_PASSWORD_FAILURE";
export const CHANGE_PASSWORD_SUCCESS: "CHANGE_PASSWORD_SUCCESS" =
  "CHANGE_PASSWORD_SUCCESS";
export const CHANGE_PASSWORD_FAILURE: "CHANGE_PASSWORD_FAILURE" =
  "CHANGE_PASSWORD_FAILURE";
export const SET_READY_STATE: "SET_READY_STATE" = "SET_READY_STATE";

export interface ISetUserDataAction {
  type: typeof SET_USER_DATA;
  payload: TProfileAuthorizationState;
}

export interface ISetReadyStateAction {
  readonly type: typeof SET_READY_STATE;
}

export interface IResetPasswordSuccessAction {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
}

export interface IResetPasswordFailureAction {
  readonly type: typeof RESET_PASSWORD_FAILURE;
}

export interface IChangePasswordSuccessAction {
  readonly type: typeof CHANGE_PASSWORD_SUCCESS;
}

export interface IChangePasswordFailureAction {
  readonly type: typeof CHANGE_PASSWORD_FAILURE;
}

export interface ITryAuthorizationAction {
  (email: string, password: string): (dispatch: AppDispatch) => Promise<void>;
}

export interface ITryRegistration {
  (email: string, password: string, name: string): (
    dispatch: AppDispatch
  ) => Promise<void>;
}

export interface IResetPasswordRequest {
  (email: string): (dispatch: AppDispatch) => Promise<void>;
}

export interface IChangePasswordRequest {
  (password: string, token: string): (dispatch: AppDispatch) => Promise<void>;
}

export type TAuthorizationActions =
  | ISetUserDataAction
  | ISetReadyStateAction
  | IResetPasswordSuccessAction
  | IResetPasswordFailureAction
  | IChangePasswordSuccessAction
  | IChangePasswordFailureAction;

export const setUserData = (userData: TProfileAuthorizationState): ISetUserDataAction => {
  return {
    type: SET_USER_DATA,
    payload: userData
  };
};

export const setReadyState = (): ISetReadyStateAction => ({
  type: SET_READY_STATE,
});

export const resetPasswordSuccess = (): IResetPasswordSuccessAction => ({
  type: RESET_PASSWORD_SUCCESS,
});

export const resetPasswordFailure = (): IResetPasswordFailureAction => ({
  type: RESET_PASSWORD_FAILURE,
});

export const changePasswordSuccess = (): IChangePasswordSuccessAction => ({
  type: CHANGE_PASSWORD_SUCCESS,
});

export const changePasswordFailure = (): IChangePasswordFailureAction => ({
  type: CHANGE_PASSWORD_FAILURE,
});

export const tryAuthorization: ITryAuthorizationAction =
  (email, password) => async (dispatch) => {
    try {
      const response = await request<{
        accessToken: string;
        refreshToken: string;
        user: TProfileAuthorizationState;
      }>("auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      setTokens({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
      });
      dispatch(setUserData(response.user));
    } catch (err) {
      console.log(err);
      dispatch(
        setUserData({
          email: "",
          name: "",
        })
      );
    }
  };

export const tryRegistration: ITryRegistration =
  (email, password, name) => async (dispatch) => {
    try {
      const response = await request<{
        accessToken: string;
        refreshToken: string;
        user: TProfileAuthorizationState;
      }>("auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          name: name,
        }),
      });
      setTokens({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
      });
      dispatch(setUserData(response.user));
    } catch (err) {
      console.log(err);
      dispatch(
        setUserData({
          email: "",
          name: "",
        })
      );
    }
  };

export const resetPasswordRequest: IResetPasswordRequest =
  (email) => async (dispatch) => {
    try {
      const response = await request<TResponseDataAPI>("password-reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      if (response.success) {
        dispatch(resetPasswordSuccess());
      } else {
        dispatch(resetPasswordFailure());
      }
    } catch (err) {
      console.log(err);
      dispatch(resetPasswordFailure());
    }
  };

export const changePasswordRequest: IChangePasswordRequest =
  (password, token) => async (dispatch) => {
    try {
      const response = await request<TResponseDataAPI>("password-reset/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: password,
          token: token,
        }),
      });

      if (response.success) {
        dispatch(changePasswordSuccess());
      } else {
        dispatch(changePasswordFailure());
      }
    } catch (err) {
      console.log(err);
      dispatch(changePasswordFailure());
    }
  };
