import { request } from "../../utils/connector";

export const SET_USER_DATA = "SET_USER_DATA";

export const setUserData = (userData) => ({
  type: SET_USER_DATA,
  payload: userData,
});

export const tryAuthorization = (email, password) => async (dispatch) => {
    alert()
  try {
    const response = await request("auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "email": email, 
        "password": password 
      } ),
    });

    dispatch(setUserData(response.user));
  } catch (err) {
    console.log(err)
    dispatch(setUserData({
        "email": "",
        "name": "",
    }));
  }
};
