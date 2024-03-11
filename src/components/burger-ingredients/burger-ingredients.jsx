import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import GroupCards from "../group-cards/group-cards";
import { ingredientType } from "../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/burger-ingredients";

function filterData(data, type) {
  return data.filter((item) => item.type === type);
}

const BurgerIngredients = ({ onItemClick }) => {
  const [current, setCurrent] = useState("bun");

  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.ingredients.data);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  if (loading) {
    return <div>Загрузка данных...</div>;
  }

  if (error) {
    return <div>Произошла ошибка: {error}</div>;
  }

  const filteredSelectedItems = ingredients;
  // .filter(item => item.count > 0);

  return (
    <section className={styles.section}>
      <h1 className={styles.header}>Соберите бургер</h1>
      <div className={styles.div}>
        <Tab
          value="bun"
          active={current === "bun"}
          onClick={() => setCurrent("bun")}
        >
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={current === "sauce"}
          onClick={() => setCurrent("sauce")}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={current === "main"}
          onClick={() => setCurrent("main")}
        >
          Начинки
        </Tab>
      </div>
      <div className={styles.scrollableContainer}>
        <GroupCards
          data={filterData(ingredients, "bun")}
          groupName="Булки"
          onItemClick={onItemClick}
          count={filteredSelectedItems.length}
        />
        <GroupCards
          data={filterData(ingredients, "sauce")}
          groupName="Соусы"
          onItemClick={onItemClick}
          count={filteredSelectedItems.length}
        />
        <GroupCards
          data={filterData(ingredients, "main")}
          groupName="Начинки"
          onItemClick={onItemClick}
          count={filteredSelectedItems.length}
        />
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  onItemClick: PropTypes.func.isRequired,
  cardsData: PropTypes.arrayOf(ingredientType),
};

export default BurgerIngredients;
