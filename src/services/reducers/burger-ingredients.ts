import { IIngredient } from "../../utils/types";
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  TBurgerIngredientsActions,
} from "../actions/burger-ingredients";

type TBurgerIngredientsState = {
  data: IIngredient[];
  loading: boolean;
  error: string | null;
}

const initialState: TBurgerIngredientsState = {
  data: [],
  loading: false,
  error: null,
};

const burgerIngredientsReducer = (
  state = initialState,
  action: TBurgerIngredientsActions
): TBurgerIngredientsState => {
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
