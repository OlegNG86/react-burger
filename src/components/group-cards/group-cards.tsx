import styles from "./group-cards.module.css";
import IngredientCard from "../ingredient-card/ingredient-card";
import React from "react";
import { IIngredient } from "../../utils/types";
import { useAppSelector } from "../../hooks/redux";

const GroupCards = React.forwardRef(
  (
    { data, groupName }: { data: IIngredient[]; groupName: string },
    ref: any
  ) => {
    const { bun, topping } = useAppSelector(
      (store: any) => store.burgerConstructor
    );
    const constructorIngredients = [bun, ...topping, bun];
    return (
      <div ref={ref}>
        <h3 className={`text text_type_main-medium`}>{groupName}</h3>
        <ul className={styles.cards__list}>
          {data.map((ingredient) => {
            const count = constructorIngredients.filter(
              (item) => ingredient._id === item._id
            ).length;
            return (
              <IngredientCard
                key={ingredient._id}
                ingredient={ingredient}
                count={count}
              />
            );
          })}
        </ul>
      </div>
    );
  }
);

export default GroupCards;
