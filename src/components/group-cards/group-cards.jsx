import styles from './group-cards.module.css';
import IngredientCard from '../ingredient-card/ingredient-card';
import React from 'react';

const GroupCards = React.forwardRef(({ data, groupName }, ref) => {
    return (
        <div ref={ref}>
            <h3 className={`text text_type_main-medium`}>{groupName}</h3>
            <ul className={`ml-4 mt-6 mb-10 ${styles.cards__list}`}>
                {data.map((cardData) => {
                    return (
                        <IngredientCard key={cardData._id} cardData={cardData} />
                    )
                })}
            </ul>
        </div>
    );
});

export default GroupCards;