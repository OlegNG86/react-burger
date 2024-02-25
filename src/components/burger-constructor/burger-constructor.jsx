import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css';
import { DragIcon, ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'

function BurgerConstructor( {openOrder} ) {
  return (
    <section className={`ml-22 mt-25 ${styles.section}`}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
        />
        <ConstructorElement
          text="Краторная булка N-200i (верх)"
          price={50}
          thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
        />
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={200}
          thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
        />
      </div>
      <div className={`mt-10 pb-10`}>
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
  data: PropTypes.arrayOf(PropTypes.shape({
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