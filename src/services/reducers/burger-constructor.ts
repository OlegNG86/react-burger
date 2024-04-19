import { IIngredient, IIngredientWithUID } from "../../utils/types.js";
import {
  ADD_BUN,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  CHANGE_INDEXES,
  RESET_CONSTRUCTOR
} from "../actions/burger-constructor.js";

const initialState = {
  bun: {},
  topping: [],
  totalPrice: 0,
};

const burgerConstructorReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_BUN:
      return {
        ...state,
        bun: { ...action.bun },
      };
    case ADD_INGREDIENT:
      return {
        ...state,
        topping: [...(state.topping || []), action.payload],
      };
    case DELETE_INGREDIENT:
      return {
        ...state,
        topping: state.topping.filter(
          (item: IIngredientWithUID) => item.uniqueId !== action.uniqueId
        ),
      };
    case CHANGE_INDEXES: {
      const newTopping = [ ...state.topping ]
      const swapItems = {
        from: newTopping[action.from],
        to: newTopping[action.to],
       }
       newTopping[action.from] = swapItems.to;
       newTopping[action.to] = swapItems.from;
      return {
        ...state,
        topping: newTopping
      };
    }
    case RESET_CONSTRUCTOR:
      return {
        ...state,
        bun: {},
        topping: []
      };
    default:
      return state;
  }
};

export default burgerConstructorReducer;
