import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import { IIngredient } from "../utils/types";

const IngredientPage = () => {
  const { id } = useParams();
  const ingredients = useSelector((state: any) => state.ingredients.data) as IIngredient[];
  const ingredient = ingredients.find((item) => item._id === id);

  return (
    <div>
      {ingredient ? (
        <IngredientDetails ingredientData={ingredient} />
      ) : (
        <div>Ингредиент не найден</div>
      )}
    </div>
  );
};

export default IngredientPage;
