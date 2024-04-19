import { IIngredientWithUID } from "../../utils/types";
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
} from "../actions/burger-ingredients";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const burgerIngredientsReducer = (state = initialState, action: {type: string, payload: any, ingredients: IIngredientWithUID[]}) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        data: action.ingredients,
        loading: false,
        error: null,
      };
    case GET_INGREDIENTS_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default burgerIngredientsReducer;
