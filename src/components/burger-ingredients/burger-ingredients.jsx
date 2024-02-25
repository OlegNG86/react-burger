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
  const bunRef = React.useRef(null);
  const sauceRef = React.useRef(null);
  const mainRef = React.useRef(null);

  const scrollToRef = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  React.useEffect(() => {
    let ref;
    switch (current) {
      case 'bun':
        ref = bunRef;
        break;
      case 'sauce':
        ref = sauceRef;
        break;
      case 'main':
        ref = mainRef;
        break;
      default:
        ref = bunRef;
    }
    scrollToRef(ref);
  }, [current]);

  return (
    <section className={styles.section}>
      ...
      <div style={{ display: 'flex' }}>
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
          <GroupCards data={ filterData(cardsData, 'bun') } groupName='Булки' ref={bunRef}/>
          <GroupCards data={ filterData(cardsData, 'sauce') } groupName='Соусы' ref={sauceRef}/>
          <GroupCards data={ filterData(cardsData, 'main') } groupName='Начинки' ref={mainRef}/>
      </div>
    </section>
  );
};

export default BurgerIngredients;

BurgerIngredients.propTypes = {
  className: PropTypes.any
}