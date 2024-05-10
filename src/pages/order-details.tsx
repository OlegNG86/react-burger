import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-datails.module.css";
import { TOrderDetails } from "../utils/types";

const OrderDetailsPage: React.FC<TOrderDetails> = ({
  number,
  foodName,
  ingredients,
  date,
  total,
}) => {
  return (
    <section className={styles.cardOrder}>
      <div className={styles.numberOrder}>#{number}</div>
      <h3 className={styles.foodName}>{foodName}</h3>
      <p className={styles.wordDone}>Выполнен</p>

      <ul className={styles.allIngredients}>
        <h3 className={styles.titleIngredients}>Состав:</h3>
        {ingredients.map((ingredient, index) => (
          <li key={index} className={styles.IngredientsItems}>
            <div className={styles.coverIconsItem}>
              <img
                className={styles.iconsItem}
                src={ingredient.image_large}
                alt={ingredient.name}
              ></img>
            </div>
            <p className={styles.nameIngredient}>{ingredient.name}</p>
            <p className={styles.numbersQuantity}>
              {ingredient.count} x {ingredient.price}{" "}
              <span className={styles.iconTotal}>
                {<CurrencyIcon type={"primary"} />}
              </span>
            </p>
          </li>
        ))}
      </ul>
      <div className={styles.dateOrderCard}>
        <p className={styles.dateOrder}>{date}</p>
        <p className={styles.totalItem}>
          {total}
          <span className={styles.iconTotal}>
            {<CurrencyIcon type={"primary"} />}
          </span>
        </p>
      </div>
    </section>
  );
};

export default OrderDetailsPage;
