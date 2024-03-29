import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import GroupCards from "../group-cards/group-cards";
import { ingredientType } from "../../utils/types";
import { getIngredients } from "../../services/actions/burger-ingredients";
import { useNavigate } from "react-router-dom";

function filterData(data, type) {
  return data.filter((item) => item.type === type);
}

const BurgerIngredients = ({ onItemClick }) => {
  const [bunRef, inViewBun] = useInView({ threshold: 0 });
  const [mainRef, inViewMain] = useInView({ threshold: 0 });
  const [sauceRef, inViewSauce] = useInView({ threshold: 0 });
  const navigate = useNavigate();

  const setCurrent = useCallback(() => {
    if (inViewBun) {
      return "bun";
    } else if (inViewSauce) {
      return "sauce";
    } else if (inViewMain) {
      return "main";
    }
  }, [inViewBun, inViewSauce, inViewMain]);

  const current = useMemo(() => setCurrent(), [setCurrent]);

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

  const handleItemClick = (id) => {
    navigate(`/ingredients/${id}`);
  };

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
          ref={bunRef}
          data={filterData(ingredients, "bun")}
          groupName="Булки"
          onItemClick={handleItemClick}
          count={filteredSelectedItems.length}
        />
        <GroupCards
          ref={sauceRef}
          data={filterData(ingredients, "sauce")}
          groupName="Соусы"
          onItemClick={handleItemClick}
          count={filteredSelectedItems.length}
        />
        <GroupCards
          ref={mainRef}
          data={filterData(ingredients, "main")}
          groupName="Начинки"
          onItemClick={handleItemClick}
          count={filteredSelectedItems.length}
        />
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  onItemClick: PropTypes.func.isRequired,
};

export default BurgerIngredients;
