import orderReducer, {
  TOrderDetailsState,
  initialState,
} from "./order-details";
import {
  SET_ORDER_ID,
  SET_ERROR,
  RESET_ORDER_ID,
  GET_ORDER_OBJECT_REQUEST,
  GET_ORDER_OBJECT_SUCCESS,
  GET_ORDER_OBJECT_FAILED,
  TOrderDetailsActions,
} from "../actions/order-details";
import { orderObject } from "../../utils/test-data";

describe("orderReducer", () => {
  it("should return the initial state", () => {
    expect(orderReducer(undefined, {} as TOrderDetailsActions)).toEqual(
      initialState
    );
  });

  it("should handle SET_ORDER_ID", () => {
    const action: TOrderDetailsActions = { type: SET_ORDER_ID, payload: 12345 };
    const expectedState: TOrderDetailsState = {
      ...initialState,
      orderId: 12345,
    };
    expect(orderReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle RESET_ORDER_ID", () => {
    const initialStateWithOrderId: TOrderDetailsState = {
      ...initialState,
      orderId: 12345,
    };
    const action: TOrderDetailsActions = { type: RESET_ORDER_ID };
    const expectedState: TOrderDetailsState = {
      ...initialState,
      orderId: null,
    };
    expect(orderReducer(initialStateWithOrderId, action)).toEqual(
      expectedState
    );
  });

  it("should handle SET_ERROR", () => {
    const action: TOrderDetailsActions = {
      type: SET_ERROR,
      payload: "Some error",
    };
    const expectedState: TOrderDetailsState = {
      ...initialState,
      error: "Some error",
    };
    expect(orderReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle GET_ORDER_OBJECT_REQUEST", () => {
    const action: TOrderDetailsActions = { type: GET_ORDER_OBJECT_REQUEST };
    const expectedState: TOrderDetailsState = {
      ...initialState,
      error: null,
    };
    expect(orderReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle GET_ORDER_OBJECT_SUCCESS", () => {

    const action: TOrderDetailsActions = {
      type: GET_ORDER_OBJECT_SUCCESS,
      orderObject,
    };
    const expectedState: TOrderDetailsState = {
      ...initialState,
      orderObject,
      error: null,
    };
    expect(orderReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle GET_ORDER_OBJECT_FAILED", () => {
    const action: TOrderDetailsActions = {
      type: GET_ORDER_OBJECT_FAILED,
      payload: "Failed to fetch order",
    };
    const expectedState: TOrderDetailsState = {
      ...initialState,
      error: "Failed to fetch order",
    };
    expect(orderReducer(initialState, action)).toEqual(expectedState);
  });
});
