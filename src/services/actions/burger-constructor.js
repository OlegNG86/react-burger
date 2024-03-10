export const ADD_BUN = 'ADD_BUN';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';

export const addBun = (bun) => ({ type: ADD_BUN, bun });

export const addIngredient = (item) => ({
    type: ADD_INGREDIENT,
    payload: { ...item, id: crypto.randomUUID() }
  });