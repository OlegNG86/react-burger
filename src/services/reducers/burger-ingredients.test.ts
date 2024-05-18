import burgerIngredientsReducer from "./burger-ingredients";
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  TBurgerIngredientsActions,
} from "../actions/burger-ingredients";
import { IIngredient } from "../../utils/types";

type TBurgerIngredientsState = {
  data: IIngredient[];
  loading: boolean;
  error: string | null;
};

describe("burgerIngredientsReducer", () => {
  const initialState: TBurgerIngredientsState = {
    data: [],
    loading: false,
    error: null,
  };

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
    const ingredients: IIngredient[] = [
      {
        _id: "1",
        name: "Ingredient 1",
        type: "main",
        proteins: 10,
        fat: 10,
        carbohydrates: 10,
        calories: 100,
        price: 5,
        image: "image",
        image_mobile: "image_mobile",
        image_large: "image_large",
      },
      {
        _id: "2",
        name: "Ingredient 2",
        type: "main",
        proteins: 20,
        fat: 20,
        carbohydrates: 20,
        calories: 200,
        price: 10,
        image: "image",
        image_mobile: "image_mobile",
        image_large: "image_large",
      },
    ];
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
