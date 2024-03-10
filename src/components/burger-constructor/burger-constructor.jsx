import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css';
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ingredientType } from '../../utils/types';
import { useDispatch, useSelector } from 'react-redux';

function BurgerConstructor( {openOrder} ) {
  const ingredients = useSelector(state => state.ingredients.data);
  return (
    <section className={styles.section}>
      <div className={styles.borders}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
        />
      </div>
        <div className={styles.scrollableContainer}>
        {ingredients.filter(cardData => cardData.type !== 'bun').map((cardData) => {
            return (
                <div key={cardData._id} className={styles.item}>
                    <DragIcon />
                    <ConstructorElement
                        text={cardData.name}
                        price={cardData.price}
                        thumbnail={cardData.image}
                    />
                </div>
            )
        })}
        </div>
        <div className={styles.borders}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={200}
          thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
        />
      </div>
      <div className={styles.orderButton}>
        <p className={styles.text}>610</p>
        <div className={styles.icon}>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType='submit' type="primary" size="large" onClick={openOrder}>Оформить заказ</Button>
      </div>
    </section>
  );
}

export default BurgerConstructor;

BurgerConstructor.propTypes = {
  openOrder: PropTypes.func.isRequired,
  ingredients: PropTypes.arrayOf(ingredientType)
}