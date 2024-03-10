import { combineReducers } from 'redux';
import burgerIngredientsReducer from './burger-ingredients';
import burgerConstructorReducer from './burger-constructor';

export const rootReducer = combineReducers({
    ingredients: burgerIngredientsReducer,
    constructor: burgerConstructorReducer
  });