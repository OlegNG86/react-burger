import {
  FEED_CONNECTION_SUCCESS,
  FEED_GET_MESSAGE,
  FEED_CONNECTION_CLOSED,
  FEED_CONNECTION_ERROR,
  TFeedActions,
} from "../actions/feed";
import { TOrder } from "../../utils/types";
import { initialState, feedReducer, TFeedState } from "./feed";

describe("feedReducer", () => {
  it("should return the initial state", () => {
    expect(feedReducer(undefined, {} as TFeedActions)).toEqual(initialState);
  });

  it("should handle FEED_CONNECTION_SUCCESS", () => {
    const action: TFeedActions = { type: FEED_CONNECTION_SUCCESS };
    const expectedState: TFeedState = {
      ...initialState,
      isOpen: true,
      error: null,
    };
    expect(feedReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle FEED_CONNECTION_ERROR", () => {
    const action: TFeedActions = {
      type: FEED_CONNECTION_ERROR,
      payload: "Connection error",
    };
    const expectedState: TFeedState = {
      ...initialState,
      error: "Connection error",
    };
    expect(feedReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle FEED_CONNECTION_CLOSED", () => {
    const action: TFeedActions = { type: FEED_CONNECTION_CLOSED };
    const initialStateWithOpenConnection: TFeedState = {
      ...initialState,
      isOpen: true,
    };
    const expectedState: TFeedState = {
      ...initialState,
      isOpen: false,
    };
    expect(feedReducer(initialStateWithOpenConnection, action)).toEqual(
      expectedState
    );
  });

  it("should handle FEED_GET_MESSAGE", () => {
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
    const action: TFeedActions = {
      type: FEED_GET_MESSAGE,
      payload: {
        data: {
          orders,
          total: 100,
          totalToday: 10,
        },
      },
    };
    const expectedState: TFeedState = {
      ...initialState,
      orders,
      total: 100,
      totalToday: 10,
    };
    expect(feedReducer(initialState, action)).toEqual(expectedState);
  });
});
