import styles from "./group-cards.module.css";
import IngredientCard from "../ingredient-card/ingredient-card";
import React from "react";
import { IIngredient } from "../../utils/types";
import { useAppSelector } from "../../hooks/redux";

type Props = { data: IIngredient[]; groupName: string };
const GroupCards = React.forwardRef<HTMLDivElement, Props>(
  ({ data, groupName }, ref) => {
    const { bun, topping } = useAppSelector((store) => store.burgerConstructor);
    const constructorIngredients = bun ? [bun, ...topping, bun] : topping;

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
