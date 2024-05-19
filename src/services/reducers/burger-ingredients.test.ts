import burgerIngredientsReducer, {
  initialState,
  TBurgerIngredientsState,
} from "./burger-ingredients";
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  TBurgerIngredientsActions,
} from "../actions/burger-ingredients";
import { IIngredient } from "../../utils/types";
import { testIngredient3, testIngredient4 } from "../../utils/test-data";

describe("burgerIngredientsReducer", () => {
  it("should return the initial state", () => {
    expect(
      burgerIngredientsReducer(undefined, {} as TBurgerIngredientsActions)
    ).toEqual(initialState);
  });

  it("should handle GET_INGREDIENTS_REQUEST", () => {
    const action: TBurgerIngredientsActions = { type: GET_INGREDIENTS_REQUEST };
    const expectedState: TBurgerIngredientsState = {
      ...initialState,
      loading: true,
      error: null,
    };
    expect(burgerIngredientsReducer(initialState, action)).toEqual(
      expectedState
    );
  });

  it("should handle GET_INGREDIENTS_SUCCESS", () => {
    const ingredients: IIngredient[] = [testIngredient3, testIngredient4];
    const action: TBurgerIngredientsActions = {
      type: GET_INGREDIENTS_SUCCESS,
      ingredients,
    };
    const expectedState: TBurgerIngredientsState = {
      ...initialState,
      data: ingredients,
      loading: false,
      error: null,
    };
    expect(burgerIngredientsReducer(initialState, action)).toEqual(
      expectedState
    );
  });

  it("should handle GET_INGREDIENTS_FAILED", () => {
    const action: TBurgerIngredientsActions = {
      type: GET_INGREDIENTS_FAILED,
      payload: "Failed to fetch ingredients",
    };
    const expectedState: TBurgerIngredientsState = {
      ...initialState,
      loading: false,
      error: "Failed to fetch ingredients",
    };
    expect(burgerIngredientsReducer(initialState, action)).toEqual(
      expectedState
    );
  });
});
