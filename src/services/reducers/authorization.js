import {
  SET_USER_DATA,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE,
  SET_READY_STATE,
} from "../actions/authorization";

const initialState = {
  auth: false,
  isReady: false,
  profile: {
    email: "",
    name: "",
  },
  resetPasswordSuccess: false,
  changePasswordSuccess: false,
};

const authorizationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        auth: !!action.payload.name && !!action.payload.email,
        profile: action.payload,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordSuccess: true,
      };
    case RESET_PASSWORD_FAILURE:
      return {
        ...state,
        resetPasswordSuccess: false,
      };
    case SET_READY_STATE:
      return {
        ...state,
        isReady: true,
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordSuccess: false,
        changePasswordSuccess: true,
      };
    case CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        changePasswordSuccess: false,
      };
    default:
      return state;
  }
};

export default authorizationReducer;
