import {
  SET_USER_DATA,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
} from "../actions/authorization";

const initialState = {
  auth: false,
  profile: {
    email: "",
    name: "",
  },
  resetPasswordSuccess: false,
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
    default:
      return state;
  }
};

export default authorizationReducer;
