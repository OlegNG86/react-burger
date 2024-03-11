import {
    ADD_BUN,
    ADD_INGREDIENT,
    DELETE_INGREDIENT
} from '../actions/burger-constructor';

const initialState = {
    bun: {},
    topping: [],
    totalPrice: 0
    
};

const burgerConstructorReducer = (state = initialState, action) => {
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
            topping: state.topping.filter((item) => item.id !== action.id),
        };
      default:
        return state;
    }
};

export default burgerConstructorReducer;

  