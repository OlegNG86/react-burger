import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import IngredientDetails from "../ingredient-details/ingredient-details";

const IngredientPage = () => {
  const { id } = useParams();
  const ingredients = useSelector((state) => state.ingredients.data);
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
