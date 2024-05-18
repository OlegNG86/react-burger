import burgerConstructorReducer from "./burger-constructor";
import {
  ADD_BUN,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  CHANGE_INDEXES,
  RESET_CONSTRUCTOR,
  TBurgerConstructorActions,
} from "../actions/burger-constructor";
import { IIngredient, IIngredientWithUID } from "../../utils/types";

type TBurgerConstructorState = {
  bun: IIngredient | null;
  topping: IIngredientWithUID[];
  totalPrice: number;
};

describe("burgerConstructorReducer", () => {
  const initialState: TBurgerConstructorState = {
    bun: null,
    topping: [],
    totalPrice: 0,
  };

  it("should return the initial state", () => {
    expect(
      burgerConstructorReducer(undefined, {} as TBurgerConstructorActions)
    ).toEqual(initialState);
  });

  it("should handle ADD_BUN", () => {
    const bun: IIngredient = {
      _id: "1",
      name: "Bun",
      type: "bun",
      proteins: 10,
      fat: 10,
      carbohydrates: 10,
      calories: 100,
      price: 2,
      image: "image",
      image_mobile: "image_mobile",
      image_large: "image_large",
    };
    const action: TBurgerConstructorActions = {
      type: ADD_BUN,
      bun,
    };
    const expectedState: TBurgerConstructorState = {
      ...initialState,
      bun: { ...bun },
    };
    expect(burgerConstructorReducer(initialState, action)).toEqual(
      expectedState
    );
  });

  it("should handle ADD_INGREDIENT", () => {
    const ingredient: IIngredientWithUID = {
      _id: "1",
      name: "Ingredient",
      type: "main",
      proteins: 10,
      fat: 10,
      carbohydrates: 10,
      calories: 100,
      price: 5,
      image: "image",
      image_mobile: "image_mobile",
      image_large: "image_large",
      uniqueId: "unique-1",
    };
    const action: TBurgerConstructorActions = {
      type: ADD_INGREDIENT,
      payload: ingredient,
    };
    const expectedState: TBurgerConstructorState = {
      ...initialState,
      topping: [ingredient],
    };
    expect(burgerConstructorReducer(initialState, action)).toEqual(
      expectedState
    );
  });

  it("should handle DELETE_INGREDIENT", () => {
    const ingredient: IIngredientWithUID = {
      _id: "1",
      name: "Ingredient",
      type: "main",
      proteins: 10,
      fat: 10,
      carbohydrates: 10,
      calories: 100,
      price: 5,
      image: "image",
      image_mobile: "image_mobile",
      image_large: "image_large",
      uniqueId: "unique-1",
    };
    const initialStateWithIngredient: TBurgerConstructorState = {
      ...initialState,
      topping: [ingredient],
    };
    const action: TBurgerConstructorActions = {
      type: DELETE_INGREDIENT,
      uniqueId: "unique-1",
    };
    const expectedState: TBurgerConstructorState = {
      ...initialState,
      topping: [],
    };
    expect(
      burgerConstructorReducer(initialStateWithIngredient, action)
    ).toEqual(expectedState);
  });

  it("should handle CHANGE_INDEXES", () => {
    const ingredient1: IIngredientWithUID = {
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
      uniqueId: "unique-1",
    };
    const ingredient2: IIngredientWithUID = {
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
      uniqueId: "unique-2",
    };
    const initialStateWithIngredients: TBurgerConstructorState = {
      ...initialState,
      topping: [ingredient1, ingredient2],
    };
    const action: TBurgerConstructorActions = {
      type: CHANGE_INDEXES,
      from: 0,
      to: 1,
    };
    const expectedState: TBurgerConstructorState = {
      ...initialState,
      topping: [ingredient2, ingredient1],
    };
    expect(
      burgerConstructorReducer(initialStateWithIngredients, action)
    ).toEqual(expectedState);
  });

  it("should handle RESET_CONSTRUCTOR", () => {
    const initialStateWithIngredients: TBurgerConstructorState = {
      bun: {
        _id: "1",
        name: "Bun",
        type: "bun",
        proteins: 10,
        fat: 10,
        carbohydrates: 10,
        calories: 100,
        price: 2,
        image: "image",
        image_mobile: "image_mobile",
        image_large: "image_large",
      },
      topping: [
        {
          _id: "1",
          name: "Ingredient",
          type: "main",
          proteins: 10,
          fat: 10,
          carbohydrates: 10,
          calories: 100,
          price: 5,
          image: "image",
          image_mobile: "image_mobile",
          image_large: "image_large",
          uniqueId: "unique-1",
        },
      ],
      totalPrice: 7,
    };
    const action: TBurgerConstructorActions = {
      type: RESET_CONSTRUCTOR,
    };
    expect(
      burgerConstructorReducer(initialStateWithIngredients, action)
    ).toEqual(initialState);
  });
});
