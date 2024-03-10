import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredients.module.css';
import GroupCards from '../group-cards/group-cards';
import { ingredientType } from '../../utils/types';

function filterData(data, type) {
  return data.filter(item => item.type === type);
}


const BurgerIngredients = ({ cardsData, onItemClick  }) => {
  const [current, setCurrent] = useState('bun');
  const [selectedItems, setSelectedItems] = useState([]);

  const filteredSelectedItems = selectedItems.filter(item => item.count > 0);

  return (
    <section className={styles.section}>
        <h1 className={styles.header}>Соберите бургер</h1>
        <div className={styles.div}>
          <Tab value="bun" active={current === 'bun'} onClick={() => setCurrent('bun')}>
            Булки
          </Tab>
          <Tab value="sauce" active={current === 'sauce'} onClick={() => setCurrent('sauce')}>
            Соусы
          </Tab>
          <Tab value="main" active={current === 'main'} onClick={() => setCurrent('main')}>
            Начинки
          </Tab>
        </div>
        <div className={styles.scrollableContainer}>
            <GroupCards data={filterData(cardsData, 'bun')} groupName='Булки' onItemClick={onItemClick} count={filteredSelectedItems.length}/>
            <GroupCards data={filterData(cardsData, 'sauce')} groupName='Соусы' onItemClick={onItemClick} count={filteredSelectedItems.length}/>
            <GroupCards data={filterData(cardsData, 'main')} groupName='Начинки' onItemClick={onItemClick} count={filteredSelectedItems.length}/>
        </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  onItemClick: PropTypes.func.isRequired,
  cardsData: PropTypes.arrayOf(ingredientType)
}

export default BurgerIngredients;

