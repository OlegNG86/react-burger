import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-card.module.css';
import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/types';

function IngredientCard({ ingredient, onClick }) {
    const [localCount, setLocalCount] = useState(0);

    const [, dragRef] = useDrag({
        type: 'ingredient',
        item: ingredient,
      });

    const handleIncrement = () => {
        setLocalCount(1); // устанавливаем localCount в 1 при каждом клике
    };

    return (
        <li key={ingredient._id} className={styles.card} onClick={() => {onClick(ingredient); handleIncrement();}} ref={dragRef}>
            <Counter count={localCount} size="default" />
            <img src={ingredient.image} alt={ingredient.name} className={styles.card__image}></img>
            <div className={styles.card__price}>
                <p className={styles.p}>{ingredient.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={`text text_type_main-small ${styles.card__name}`}>{ingredient.name}</p>
        </li>
    );
};

IngredientCard.propTypes = {
    cardData: ingredientType.isRequired,
    onClick: PropTypes.func.isRequired,
  }

export default IngredientCard;