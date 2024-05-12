export interface IIngredient {
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  type: "bun" | "main" | "sauce";
  _id: string;
  count?: number;
}

export interface IIngredientWithUID extends IIngredient {
  uniqueId: string;
}

export type TForm = {
  name?: string;
  password?: string;
  email?: string;
  token?: string | null;
};

export type TProfileAuthorizationState = {
  email: string;
  name: string;
};

export type TOrder = {
  _id: string;
  ingredients: string[] | [];
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
};

export type TOrderCard = {
  number: string;
  foodName: string;
  icons: {
    src: string;
    alt: string;
    width: string;
  }[];
  date: string;
  total: number;
};

export type TOrderDetails = {
  number: string;
  foodName: string;
  date: string;
  total: number;
  ingredients: {
    count: number;
    image_large: string;
    name: string;
    price: number;
    priceByCount: number;
  }[];
};
