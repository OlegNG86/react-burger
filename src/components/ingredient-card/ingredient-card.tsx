import { useDrag } from "react-dnd";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient-card.module.css";
import { IIngredient } from "../../utils/types";
import { Link, useLocation } from "react-router-dom";

function IngredientCard({
  ingredient,
  count,
}: {
  ingredient: IIngredient;
  count: number;
}) {
  const location = useLocation();

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
  });

  return (
    <>
      <Link
        to={`/ingredient/${ingredient._id}`}
        state={{ ...location?.state, backgroundLocation: location }}
        className={styles.card}
        ref={dragRef}
        data-cy={`ingredient-${ingredient.type}`} // Добавляем data-cy атрибут
      >
        {count > 0 && <Counter count={count} size="default" />}
        <img
          src={ingredient.image}
          alt={ingredient.name}
          className={styles.card__image}
        ></img>
        <div className={styles.card__price}>
          <p className={styles.p}>{ingredient.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`text text_type_main-small ${styles.card__name}`}>
          {ingredient.name}
        </p>
      </Link>
    </>
  );
}

export default IngredientCard;
