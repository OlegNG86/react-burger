import styles from "./group-cards.module.css";
import IngredientCard from "../ingredient-card/ingredient-card";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { ingredientType } from "../../utils/types";

const GroupCards = React.forwardRef(
  ({ data, groupName, onItemClick, count }, ref) => {
    const handleItemClick = (item) => {
      if (onItemClick) {
        onItemClick(item);
      }
    };

    const { bun, topping } = useSelector((store) => store.burgerConstructor);
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
                onClick={() => handleItemClick(ingredient)}
                count={count}
              />
            );
          })}
        </ul>
      </div>
    );
  }
);

GroupCards.propTypes = {
  data: PropTypes.arrayOf(ingredientType),
  groupName: PropTypes.string.isRequired,
  onItemClick: PropTypes.func.isRequired,
};

export default GroupCards;
