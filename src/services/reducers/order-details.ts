import {
  SET_ORDER_ID,
  SET_ERROR,
  RESET_ORDER_ID,
  TOrderDetailsActions,
} from "../actions/order-details";

type TOrderDetailsState = {
  orderId: any;
  error: any;
}

const initialState: TOrderDetailsState = {
  orderId: null,
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
    default:
      return state;
  }
};

export default orderReducer;
