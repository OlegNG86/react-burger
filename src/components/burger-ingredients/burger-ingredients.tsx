import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import GroupCards from "../group-cards/group-cards";
import { IIngredient } from "../../utils/types";
import { useNavigate } from "react-router-dom";

function filterData(data: IIngredient[], type: string) {
  return data.filter((item: IIngredient) => item.type === type);
}

const BurgerIngredients = () => {
  const [bunRef, inViewBun] = useInView({ threshold: 0 });
  const [mainRef, inViewMain] = useInView({ threshold: 0 });
  const [sauceRef, inViewSauce] = useInView({ threshold: 0 });

  const setCurrent = useCallback<() => string | unknown>(() => {
    if (inViewBun) {
      return "bun";
    } else if (inViewSauce) {
      return "sauce";
    } else if (inViewMain) {
      return "main";
    }
  }, [inViewBun, inViewSauce, inViewMain]);

  const current = useMemo(() => setCurrent(), [setCurrent]);

  const ingredients = useSelector((state: any) => state.ingredients.data) as IIngredient[];
  const loading = useSelector((state: any) => state.loading);
  const error = useSelector((state: any) => state.error);

  if (loading) {
    return <div>Загрузка данных...</div>;
  }

  if (error) {
    return <div>Произошла ошибка: {error}</div>;
  }

  const filteredSelectedItems = ingredients;

  return (
    <section className={styles.section}>
      <h1 className={styles.header}>Соберите бургер</h1>
      <div className={styles.div}>
        <Tab
          value="bun"
          active={current === "bun"}
          onClick={() => setCurrent()}
        >
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={current === "sauce"}
          onClick={() => setCurrent()}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={current === "main"}
          onClick={() => setCurrent()}
        >
          Начинки
        </Tab>
      </div>
      <div className={styles.scrollableContainer}>
        <GroupCards
          ref={bunRef}
          data={filterData(ingredients, "bun")}
          groupName="Булки"
        />
        <GroupCards
          ref={sauceRef}
          data={filterData(ingredients, "sauce")}
          groupName="Соусы"
        />
        <GroupCards
          ref={mainRef}
          data={filterData(ingredients, "main")}
          groupName="Начинки"
        />
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  onItemClick: PropTypes.func.isRequired,
};

export default BurgerIngredients;
