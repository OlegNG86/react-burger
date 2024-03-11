export const SHOW_INGREDIENT_IN_MODAL = "SHOW_INGREDIENT_IN_MODAL";
export const DELETE_INGREDIENT_FROM_MODAL = "DELETE_INGREDIENT_FROM_MODAL";

export const showIngredientInModal = (item) => {
  return {
    type: SHOW_INGREDIENT_IN_MODAL,
    ingredient: item,
  };
};

export const deleteIngredientFromModal = () => {
  return {
    type: DELETE_INGREDIENT_FROM_MODAL,
    ingredient: {},
  };
};
