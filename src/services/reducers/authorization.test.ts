import authorizationReducer, {
  initialState,
  TAuthorizationState,
} from "./authorization";
import {
  SET_USER_DATA,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE,
  SET_READY_STATE,
  TAuthorizationActions,
} from "../actions/authorization";

describe("authorizationReducer", () => {
  it("should return the initial state", () => {
    expect(
      authorizationReducer(undefined, {} as TAuthorizationActions)
    ).toEqual(initialState);
  });

  it("should handle SET_USER_DATA", () => {
    const action: TAuthorizationActions = {
      type: SET_USER_DATA,
      payload: {
        email: "test@example.com",
        name: "Test User",
      },
    };
    const expectedState: TAuthorizationState = {
      ...initialState,
      auth: true,
      profile: action.payload,
    };
    expect(authorizationReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle RESET_PASSWORD_SUCCESS", () => {
    const action: TAuthorizationActions = {
      type: RESET_PASSWORD_SUCCESS,
    };
    const expectedState: TAuthorizationState = {
      ...initialState,
      resetPasswordSuccess: true,
    };
    expect(authorizationReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle RESET_PASSWORD_FAILURE", () => {
    const action: TAuthorizationActions = {
      type: RESET_PASSWORD_FAILURE,
    };
    const expectedState: TAuthorizationState = {
      ...initialState,
      resetPasswordSuccess: false,
    };
    expect(authorizationReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle SET_READY_STATE", () => {
    const action: TAuthorizationActions = {
      type: SET_READY_STATE,
    };
    const expectedState: TAuthorizationState = {
      ...initialState,
      isReady: true,
    };
    expect(authorizationReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle CHANGE_PASSWORD_SUCCESS", () => {
    const action: TAuthorizationActions = {
      type: CHANGE_PASSWORD_SUCCESS,
    };
    const expectedState: TAuthorizationState = {
      ...initialState,
      resetPasswordSuccess: false,
      changePasswordSuccess: true,
    };
    expect(authorizationReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle CHANGE_PASSWORD_FAILURE", () => {
    const action: TAuthorizationActions = {
      type: CHANGE_PASSWORD_FAILURE,
    };
    const expectedState: TAuthorizationState = {
      ...initialState,
      changePasswordSuccess: false,
    };
    expect(authorizationReducer(initialState, action)).toEqual(expectedState);
  });
});
