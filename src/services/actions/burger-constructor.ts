import { v4 as uuidv4 } from "uuid";
import { IIngredient } from "../../utils/types";

export const ADD_BUN = "ADD_BUN";
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const CHANGE_INDEXES = "CHANGE_INDEXES";
export const RESET_CONSTRUCTOR = "RESET_CONSTRUCTOR";

export const changeIndexes = (from: number, to: number) => {
  return {
    type: CHANGE_INDEXES,
    from,
    to,
  };
};

export const addBun = (bun: IIngredient) => ({
  type: ADD_BUN,
  bun,
});

export const addIngredient = (item: IIngredient) => {
  return {
    type: ADD_INGREDIENT,
    payload: {
      ...item, // используем `spread`, чтобы поменять ссылку на объект. Таким образом `redux` обновит его в хранилище
      uniqueId: uuidv4(), // и добавляем в объект новое поле, которое потом будет использовано в `key`
    },
  };
};

export const resetConstructor = () => ({
  type: RESET_CONSTRUCTOR,
});

export const deleteIngredient = (uniqueId: string) => ({
  type: DELETE_INGREDIENT,
  uniqueId,
});
