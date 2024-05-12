import { TOrder } from "../../utils/types";
import {
  SET_ORDER_ID,
  SET_ERROR,
  RESET_ORDER_ID,
  GET_ORDER_OBJECT_REQUEST,
  GET_ORDER_OBJECT_SUCCESS,
  GET_ORDER_OBJECT_FAILED,
  TOrderDetailsActions,
} from "../actions/order-details";

type TOrderDetailsState = {
  orderId: number | null;
  orderObject: TOrder[] | [];
  error: string | null;
};

const initialState: TOrderDetailsState = {
  orderId: null,
  orderObject: [],
  error: null,
};

const orderReducer = (
  state = initialState,
  action: TOrderDetailsActions
): TOrderDetailsState => {
  switch (action.type) {
    case SET_ORDER_ID:
      return {
        ...state,
        orderId: action.payload,
      };
    case RESET_ORDER_ID:
      return {
        ...state,
        orderId: null,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case GET_ORDER_OBJECT_REQUEST:
      return { ...state, error: null };
    case GET_ORDER_OBJECT_SUCCESS:
      return {
        ...state,
        orderObject: action.orderObject,
        error: null,
      };
    case GET_ORDER_OBJECT_FAILED:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default orderReducer;
