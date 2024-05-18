import {
  ORDERS_CONNECTION_SUCCESS,
  ORDERS_GET_MESSAGE,
  ORDERS_CONNECTION_CLOSED,
  ORDERS_CONNECTION_ERROR,
  TOrdersActions,
} from "../actions/orders";
import { TOrder } from "../../utils/types";
import { ordersReducer, TOrdersState, initialState } from "./orders";

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
    const orders: TOrder[] = [
      {
        _id: "1",
        ingredients: ["ingredient1", "ingredient2"],
        status: "done",
        name: "Order 1",
        createdAt: "2023-01-01T00:00:00.000Z",
        updatedAt: "2023-01-01T00:00:00.000Z",
        number: 1,
      },
    ];
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
