import {
    ADD_BUN,
    ADD_INGREDIENT
} from '../actions/burger-constructor';

const initialState = {
    bun: {},
    topping: []
    
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
      default:
        return state;
    }
};

export default burgerConstructorReducer;

  