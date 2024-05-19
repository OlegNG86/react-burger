import { IIngredient, IIngredientWithUID, TOrder } from "./types";

// Константы для тестовых данных
export const testBun: IIngredient = {
  _id: "1",
  name: "Bun",
  type: "bun",
  proteins: 10,
  fat: 10,
  carbohydrates: 10,
  calories: 100,
  price: 2,
  image: "image",
  image_mobile: "image_mobile",
  image_large: "image_large",
};

export const testIngredient3: IIngredient = {
  ...testBun,
  _id: "1",
  name: "Ingredient 1",
  type: "main",
  proteins: 10,
  fat: 10,
  carbohydrates: 10,
  calories: 100,
  price: 5,
  image: "image",
  image_mobile: "image_mobile",
  image_large: "image_large",
};

export const testIngredient4: IIngredient = {
  ...testIngredient3,
  _id: "2",
  name: "Ingredient 2",
  proteins: 20,
  fat: 20,
  carbohydrates: 20,
  calories: 200,
  price: 10,
};

export const testIngredient: IIngredientWithUID = {
  _id: "1",
  name: "Ingredient",
  type: "main",
  proteins: 10,
  fat: 10,
  carbohydrates: 10,
  calories: 100,
  price: 5,
  image: "image",
  image_mobile: "image_mobile",
  image_large: "image_large",
  uniqueId: "unique-1",
};

export const testIngredient1: IIngredientWithUID = {
  ...testIngredient,
  _id: "1",
  name: "Ingredient 1",
};

export const testIngredient2: IIngredientWithUID = {
  ...testIngredient,
  _id: "2",
  name: "Ingredient 2",
  proteins: 20,
  fat: 20,
  carbohydrates: 20,
  calories: 200,
  price: 10,
  uniqueId: "unique-2",
};

export const orderObject: TOrder[] = [
  {
    _id: "1",
    ingredients: ["ingredient1", "ingredient2"],
    status: "done",
    name: "Order 1",
    createdAt: "2023-01-01T00:00:00.000Z",
    updatedAt: "2023-01-01T00:00:00.000Z",
    number: 1,
  },
];
