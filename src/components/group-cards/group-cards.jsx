import styles from './group-cards.module.css';
import IngredientCard from '../ingredient-card/ingredient-card';
import React from 'react';
import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/types';

const GroupCards = React.forwardRef(({ data, groupName, onItemClick, count }, ref) => {
    const handleItemClick = (item) => {
        if (onItemClick) {
            onItemClick(item);
        }
    };

    return (
        <div ref={ref}>
            <h3 className={`text text_type_main-medium`}>{groupName}</h3>
            <ul className={styles.cards__list}>
                {data.map((cardData) => {
                    return (
                        <IngredientCard 
                        key={cardData._id} 
                        cardData={cardData} 
                        onClick={() => handleItemClick(cardData)} 
                        count={count} />
                    )
                })}
            </ul>
        </div>
    );
});

GroupCards.propTypes = {
    data: PropTypes.arrayOf(ingredientType),
    groupName: PropTypes.string.isRequired,
    onItemClick: PropTypes.func.isRequired,
    count: PropTypes.number,
  }

export default GroupCards;