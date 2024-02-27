import React, { useState } from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-card.module.css';
import PropTypes from 'prop-types';
import { ingredientType } from '../utils/types';

function IngredientCard({ cardData, onClick }) {
    const [localCount, setLocalCount] = useState(0);

    const handleIncrement = () => {
        setLocalCount(1); // устанавливаем localCount в 1 при каждом клике
    };

    return (
        <li key={cardData._id} className={styles.card} onClick={() => {onClick(cardData); handleIncrement();}}>
            <Counter count={localCount} size="default" />
            <img src={cardData.image} alt={cardData.name} className={styles.card__image}></img>
            <div className={styles.card__price}>
                <p className={styles.p}>{cardData.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={`text text_type_main-small ${styles.card__name}`}>{cardData.name}</p>
        </li>
    );
};

IngredientCard.propTypes = {
    cardData: PropTypes.arrayOf(ingredientType),
    onClick: PropTypes.func.isRequired,
  }

export default IngredientCard;