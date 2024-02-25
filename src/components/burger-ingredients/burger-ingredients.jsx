import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredients.module.css';
import GroupCards from '../group-cards/group-cards';

function filterData(data, type) {
  return data.filter(item => item.type === type);
}

filterData.propTypes = {
  type: PropTypes.string.isRequired
}

const BurgerIngredients = ({ cardsData }) => {
  const [current, setCurrent] = React.useState('bun');

  return (
    <section className={styles.section}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <p className={"text text_type_main-large mt-5 pl-1"}>Соберите бургер</p>
        <div style={{ marginBottom: '20px' }}></div>
        <div style={{ display: 'flex' }}>
          <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
            Булки
          </Tab>
          <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
            Соусы
          </Tab>
          <Tab value="main" active={current === 'main'} onClick={setCurrent}>
            Начинки
          </Tab>
        </div>
        <div style={{ marginTop: '40px' }}></div>
      </div>
      <div className={styles.scrollableContainer}>
          <GroupCards data={ filterData(cardsData, 'bun') } groupName='Булки'/>
          <GroupCards data={ filterData(cardsData, 'sauce') } groupName='Соусы'/>
          <GroupCards data={ filterData(cardsData, 'main') } groupName='Начинки'/>
      </div>
    </section>
  );
};

export default BurgerIngredients;

BurgerIngredients.propTypes = {
  className: PropTypes.any
}