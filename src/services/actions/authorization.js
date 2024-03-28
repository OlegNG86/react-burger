import { request } from "../../utils/connector";

export const SET_USER_DATA = "SET_USER_DATA";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILURE = "RESET_PASSWORD_FAILURE";

export const setUserData = (userData) => ({
  type: SET_USER_DATA,
  payload: userData,
});

export const resetPasswordSuccess = () => ({
  type: RESET_PASSWORD_SUCCESS,
});

export const resetPasswordFailure = () => ({
  type: RESET_PASSWORD_FAILURE,
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
