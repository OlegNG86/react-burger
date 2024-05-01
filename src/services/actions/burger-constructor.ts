import { v4 as uuidv4 } from "uuid";
import { IIngredient } from "../../utils/types";

export const ADD_BUN: "ADD_BUN" = "ADD_BUN";
export const ADD_INGREDIENT: "ADD_INGREDIENT" = "ADD_INGREDIENT";
export const DELETE_INGREDIENT: "DELETE_INGREDIENT" = "DELETE_INGREDIENT";
export const CHANGE_INDEXES: "CHANGE_INDEXES" = "CHANGE_INDEXES";
export const RESET_CONSTRUCTOR: "RESET_CONSTRUCTOR" = "RESET_CONSTRUCTOR";

export interface IChangeIndexesAction {
  (from: number, to: number): { type: typeof CHANGE_INDEXES; from: number; to: number; };
}

export interface IAddBunAction {
  (bun: IIngredient): { type: typeof ADD_BUN; bun: IIngredient };
}

export interface IAddIngredientAction {
  (item: IIngredient): { type: typeof ADD_INGREDIENT; payload: any };
}

export interface IResetConstructorAction {
  (): { type: typeof RESET_CONSTRUCTOR };
}

export interface IDeleteIngredientAction {
  (uniqueId: string): { type: typeof DELETE_INGREDIENT; uniqueId: string; };
}

export type TBurgerConstructorActions =
  | ReturnType<IChangeIndexesAction>
  | ReturnType<IAddBunAction>
  | ReturnType<IAddIngredientAction>
  | ReturnType<IResetConstructorAction>
  | ReturnType<IDeleteIngredientAction>

export const changeIndexes: IChangeIndexesAction = (from, to) => {
  return {
    type: CHANGE_INDEXES,
    from,
    to,
  };
};

export const addBun: IAddBunAction = (bun) => ({
  type: ADD_BUN,
  bun,
});

export const addIngredient: IAddIngredientAction = (item) => {
  return {
    type: ADD_INGREDIENT,
    payload: {
      ...item, // используем `spread`, чтобы поменять ссылку на объект. Таким образом `redux` обновит его в хранилище
      uniqueId: uuidv4(), // и добавляем в объект новое поле, которое потом будет использовано в `key`
    },
  };
};

export const resetConstructor: IResetConstructorAction = () => ({
  type: RESET_CONSTRUCTOR,
});

export const deleteIngredient: IDeleteIngredientAction = (uniqueId) => ({
  type: DELETE_INGREDIENT,
  uniqueId,
});
