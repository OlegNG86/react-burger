import { TProfileAuthorizationState } from "../../utils/types";
import {
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_FAILURE,
  UPDATE_USER_DATA_REQUEST,
  UPDATE_USER_DATA_SUCCESS,
  UPDATE_USER_DATA_FAILURE,
  TUserActions,
} from "../actions/user";

type TUserState = {
  userData: TProfileAuthorizationState | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: TUserState = {
  userData: null,
  isLoading: false,
  error: null,
};

const userReducer = (
  state = initialState,
  action: TUserActions
): TUserState => {
  switch (action.type) {
    case GET_USER_DATA_REQUEST:
    case UPDATE_USER_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case GET_USER_DATA_SUCCESS:
    case UPDATE_USER_DATA_SUCCESS:
      return {
        ...state,
        userData: action.payload,
        isLoading: false,
        error: null,
      };
    case GET_USER_DATA_FAILURE:
    case UPDATE_USER_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
