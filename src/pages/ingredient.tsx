import { useParams } from "react-router-dom";
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import { IIngredient } from "../utils/types";
import { useAppSelector } from "../hooks/redux";

const IngredientPage = () => {
  const { id } = useParams();
  const ingredients = useAppSelector(
    (state) => state.ingredients.data
  ) as IIngredient[];
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
