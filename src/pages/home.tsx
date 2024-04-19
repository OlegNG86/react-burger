import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import style from "./home.module.css";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import { IIngredient } from "../utils/types";

const HomePage = () => {
  const [orderDetails, setOrderDetails] = useState({ isOpened: false });
  const [ingredientDetails, setIngredientDetails] = useState<{isOpened: boolean, ingredient: IIngredient | null}>({
    isOpened: false,
    ingredient: null,
  });


  const handleItemClick = (ingredient: IIngredient) => {
    setIngredientDetails({ isOpened: true, ingredient: ingredient });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <BurgerIngredients onItemClick={handleItemClick} />
      <BurgerConstructor />
    </DndProvider>
  );
};

export default HomePage;
