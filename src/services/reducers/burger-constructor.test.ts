import burgerConstructorReducer, {
  initialState,
  TBurgerConstructorState,
} from "./burger-constructor";
import {
  ADD_BUN,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  CHANGE_INDEXES,
  RESET_CONSTRUCTOR,
  TBurgerConstructorActions,
} from "../actions/burger-constructor";
import {
  testBun,
  testIngredient,
  testIngredient1,
  testIngredient2,
} from "../../utils/test-data";

describe("burgerConstructorReducer", () => {
  it("should return the initial state", () => {
    expect(
      burgerConstructorReducer(undefined, {} as TBurgerConstructorActions)
    ).toEqual(initialState);
  });

  it("should handle ADD_BUN", () => {
    const action: TBurgerConstructorActions = {
      type: ADD_BUN,
      bun: testBun,
    };
    const expectedState: TBurgerConstructorState = {
      ...initialState,
      bun: { ...testBun },
    };
    expect(burgerConstructorReducer(initialState, action)).toEqual(
      expectedState
    );
  });

  it("should handle ADD_INGREDIENT", () => {
    const action: TBurgerConstructorActions = {
      type: ADD_INGREDIENT,
      payload: testIngredient,
    };
    const expectedState: TBurgerConstructorState = {
      ...initialState,
      topping: [testIngredient],
    };
    expect(burgerConstructorReducer(initialState, action)).toEqual(
      expectedState
    );
  });

  it("should handle DELETE_INGREDIENT", () => {
    const initialStateWithIngredient: TBurgerConstructorState = {
      ...initialState,
      topping: [testIngredient],
    };
    const action: TBurgerConstructorActions = {
      type: DELETE_INGREDIENT,
      uniqueId: testIngredient.uniqueId,
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
    const initialStateWithIngredients: TBurgerConstructorState = {
      ...initialState,
      topping: [testIngredient1, testIngredient2],
    };
    const action: TBurgerConstructorActions = {
      type: CHANGE_INDEXES,
      from: 0,
      to: 1,
    };
    const expectedState: TBurgerConstructorState = {
      ...initialState,
      topping: [testIngredient2, testIngredient1],
    };
    expect(
      burgerConstructorReducer(initialStateWithIngredients, action)
    ).toEqual(expectedState);
  });

  it("should handle RESET_CONSTRUCTOR", () => {
    const initialStateWithIngredients: TBurgerConstructorState = {
      bun: testBun,
      topping: [testIngredient],
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
