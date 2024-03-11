export const ADD_BUN = "ADD_BUN";
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";

export const addBun = (bun) => ({
  type: ADD_BUN,
  bun,
});

export const addIngredient = (item) => ({
  type: ADD_INGREDIENT,
  payload: { ...item, id: Date.now().toString() },
});

export const deleteIngredient = (id) => ({
  type: DELETE_INGREDIENT,
  id,
});
