import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredients.module.css';
import GroupCards from '../group-cards/group-cards';

function filterData(data, type) {
  return data.filter(item => item.type === type);
}


const BurgerIngredients = ({ cardsData, onItemClick  }) => {
  const [current, setCurrent] = useState('bun');
  const [selectedItems, setSelectedItems] = useState([]);

  const handleAddItem = (item) => {
    const selectedItemIdx = selectedItems.findIndex(selectedItem => selectedItem._id === item._id);
    if (selectedItemIdx !== -1) {
      const updatedItems = [...selectedItems];
      updatedItems[selectedItemIdx].count += 1;
      setSelectedItems(updatedItems);
    } else {
      setSelectedItems([...selectedItems, { ...item, count: 1 }]);
    }
  };

  const filteredSelectedItems = selectedItems.filter(item => item.count > 0);

  return (
    <section className={styles.section}>
      <>
        <header className={styles.header}>Соберите бургер</header>
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
      </>

    </section>
  );
};

BurgerIngredients.propTypes = {
  onItemClick: PropTypes.func.isRequired,
  cardsData: PropTypes.arrayOf(PropTypes.shape({
      calories: PropTypes.number.isRequired,
      carbohydrates: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      image_large: PropTypes.string.isRequired,
      image_mobile: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      proteins: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      _id: PropTypes.string
  }))
}

export default BurgerIngredients;

