import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css';
import { DragIcon, ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'

function BurgerConstructor( {openOrder, ingredients} ) {
  return (
    <section className={`ml-22 mt-15 ${styles.section}`}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
        />
        <div className={`mb-2 mt-2 ${styles.scrollableContainer}`}>
            {ingredients.map((cardData) => {
                return (
                  <ConstructorElement
                  className={`mb-2 mt-2`}
                  text={cardData.name}
                  price={cardData.price}
                  thumbnail={cardData.image}
                />
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