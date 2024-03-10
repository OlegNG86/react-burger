import { combineReducers } from 'redux';
import burgerIngredientsReducer from './burger-ingredients';
import burgerConstructorReducer from './burger-constructor';
import { ingredientDetailsReducer } from './ingredient-details';
import { modalReducer } from './modal';

export const rootReducer = combineReducers({
    ingredients: burgerIngredientsReducer,
    constructor: burgerConstructorReducer,
    ingredientDetails: ingredientDetailsReducer,
    modal: modalReducer
  });