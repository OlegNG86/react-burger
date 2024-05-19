import {
  ORDERS_CONNECTION_SUCCESS,
  ORDERS_GET_MESSAGE,
  ORDERS_CONNECTION_CLOSED,
  ORDERS_CONNECTION_ERROR,
  TOrdersActions,
} from "../actions/orders";
import { ordersReducer, TOrdersState, initialState } from "./orders";
import { orderObject as orders } from "../../utils/test-data";

describe("ordersReducer", () => {
  it("should return the initial state", () => {
    expect(ordersReducer(undefined, {} as TOrdersActions)).toEqual(
      initialState
    );
  });

  it("should handle ORDERS_CONNECTION_SUCCESS", () => {
    const action: TOrdersActions = { type: ORDERS_CONNECTION_SUCCESS };
    const expectedState: TOrdersState = {
      ...initialState,
      isOpen: true,
      error: null,
    };
    expect(ordersReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle ORDERS_CONNECTION_ERROR", () => {
    const action: TOrdersActions = {
      type: ORDERS_CONNECTION_ERROR,
      payload: "Connection error",
    };
    const expectedState: TOrdersState = {
      ...initialState,
      error: "Connection error",
    };
    expect(ordersReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle ORDERS_CONNECTION_CLOSED", () => {
    const action: TOrdersActions = { type: ORDERS_CONNECTION_CLOSED };
    const initialStateWithOpenConnection: TOrdersState = {
      ...initialState,
      isOpen: true,
    };
    const expectedState: TOrdersState = {
      ...initialState,
      isOpen: false,
    };
    expect(ordersReducer(initialStateWithOpenConnection, action)).toEqual(
      expectedState
    );
  });

  it("should handle ORDERS_GET_MESSAGE", () => {
    const action: TOrdersActions = {
      type: ORDERS_GET_MESSAGE,
      payload: {
        data: {
          orders,
          total: 100,
          totalToday: 10,
        },
      },
    };
    const expectedState: TOrdersState = {
      ...initialState,
      orders,
      total: 100,
      totalToday: 10,
    };
    expect(ordersReducer(initialState, action)).toEqual(expectedState);
  });
});
