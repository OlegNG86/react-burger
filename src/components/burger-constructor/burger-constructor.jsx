import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'

function BurgerConstructor( {openOrder, ingredients} ) {
  return (
    <section className={styles.section}>
      <div className={styles.div}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
        />
        <div className={styles.scrollableContainer}>
        {ingredients.map((cardData) => {
            return (
              <div key={cardData._id} className={styles.item}>
                <ConstructorElement
                text={cardData.name}
                price={cardData.price}
                thumbnail={cardData.image}
                />
              </div>
            )
        })}
        </div>

        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={200}
          thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
        />
      </div>
      <div className={`mt-10 pb-10 ${styles.orderButton}`}>
                <Button htmlType='submit' type="primary" size="large" onClick={openOrder}>Оформить заказ</Button>
            </div>
    </section>
  );
}

export default BurgerConstructor;

BurgerConstructor.propTypes = {
  className: PropTypes.any
}

BurgerConstructor.propTypes = {
  openOrder: PropTypes.func.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.shape({
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