import { request } from "../../utils/connector";
import { setTokens, getTokens } from "../../utils/persistant-token";
import { fetchWithRefresh } from "../../utils/connector";

export const SET_USER_DATA = "SET_USER_DATA";
export const FETCH_USER_DATA = "FETCH_USER_DATA";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILURE = "RESET_PASSWORD_FAILURE";
export const CHANGE_PASSWORD_SUCCESS = "CHANGE_PASSWORD_SUCCESS";
export const CHANGE_PASSWORD_FAILURE = "CHANGE_PASSWORD_FAILURE";
export const SET_READY_STATE = "SET_READY_STATE";

export const setUserData = (userData) => ({
  type: SET_USER_DATA,
  payload: userData,
});

export const setReadyState = () => ({
  type: SET_READY_STATE,
});

export const fetchUserData = () => async (dispatch) => {
  try {
    const accessToken = getTokens().accessToken;
    if (accessToken) {
      const response = await fetchWithRefresh("auth/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authorization": accessToken,
        },
      });
      dispatch(setUserData(response.user));
    }
  } catch (err) {
    console.error(err);
  } finally {
    dispatch(setReadyState());
  }
};

export const resetPasswordSuccess = () => ({
  type: RESET_PASSWORD_SUCCESS,
});

export const resetPasswordFailure = () => ({
  type: RESET_PASSWORD_FAILURE,
});

export const changePasswordSuccess = () => ({
  type: CHANGE_PASSWORD_SUCCESS,
});

export const changePasswordFailure = () => ({
  type: CHANGE_PASSWORD_FAILURE,
});

export const tryAuthorization = (email, password) => async (dispatch) => {
  try {
    const response = await request("auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    setTokens({accessToken: response.accessToken, refreshToken: response.refreshToken})
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

export const tryRegistration = (email, password, name) => async (dispatch) => {
  try {
    const response = await request("auth/register", {
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
    setTokens({accessToken: response.accessToken, refreshToken: response.refreshToken})
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

export const resetPasswordRequest = (email) => async (dispatch) => {
  try {
    const response = await request("password-reset", {
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

export const changePasswordRequest = (password, token) => async (dispatch) => {
  try {
    const response = await request("password-reset/reset", {
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
