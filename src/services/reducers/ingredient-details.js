import {
  SHOW_INGREDIENT_IN_MODAL,
  DELETE_INGREDIENT_FROM_MODAL,
} from "../actions/ingredient-details";

const initialModalState = {
  selectedIngredient: {},
};

export const ingredientDetailsReducer = (state = initialModalState, action) => {
  switch (action.type) {
    case SHOW_INGREDIENT_IN_MODAL: {
      return {
        ...state,
        selectedIngredient: action.ingredient,
      };
    }
    case DELETE_INGREDIENT_FROM_MODAL: {
      return {
        ...state,
        selectedIngredient: {},
      };
    }
    default: {
      return state;
    }
  }
};
