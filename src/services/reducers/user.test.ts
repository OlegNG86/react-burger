import userReducer, { TUserState, initialState } from "./user";
import {
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_FAILURE,
  UPDATE_USER_DATA_REQUEST,
  UPDATE_USER_DATA_SUCCESS,
  UPDATE_USER_DATA_FAILURE,
  TUserActions,
} from "../actions/user";
import { TProfileAuthorizationState } from "../../utils/types";

describe("userReducer", () => {
  it("should return the initial state", () => {
    expect(userReducer(undefined, {} as TUserActions)).toEqual(initialState);
  });

  it("should handle GET_USER_DATA_REQUEST", () => {
    const action: TUserActions = { type: GET_USER_DATA_REQUEST };
    const expectedState: TUserState = {
      ...initialState,
      isLoading: true,
      error: null,
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle GET_USER_DATA_SUCCESS", () => {
    const userData: TProfileAuthorizationState = {
      email: "test@example.com",
      name: "Test User",
    };
    const action: TUserActions = {
      type: GET_USER_DATA_SUCCESS,
      payload: userData,
    };
    const expectedState: TUserState = {
      ...initialState,
      userData,
      isLoading: false,
      error: null,
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle GET_USER_DATA_FAILURE", () => {
    const action: TUserActions = {
      type: GET_USER_DATA_FAILURE,
      payload: "Error fetching user data",
    };
    const expectedState: TUserState = {
      ...initialState,
      isLoading: false,
      error: "Error fetching user data",
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle UPDATE_USER_DATA_REQUEST", () => {
    const action: TUserActions = { type: UPDATE_USER_DATA_REQUEST };
    const expectedState: TUserState = {
      ...initialState,
      isLoading: true,
      error: null,
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle UPDATE_USER_DATA_SUCCESS", () => {
    const userData: TProfileAuthorizationState = {
      email: "test@example.com",
      name: "Updated User",
    };
    const action: TUserActions = {
      type: UPDATE_USER_DATA_SUCCESS,
      payload: userData,
    };
    const expectedState: TUserState = {
      ...initialState,
      userData,
      isLoading: false,
      error: null,
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle UPDATE_USER_DATA_FAILURE", () => {
    const action: TUserActions = {
      type: UPDATE_USER_DATA_FAILURE,
      payload: "Error updating user data",
    };
    const expectedState: TUserState = {
      ...initialState,
      isLoading: false,
      error: "Error updating user data",
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });
});
