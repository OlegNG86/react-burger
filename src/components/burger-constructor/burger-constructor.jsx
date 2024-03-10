import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css';
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ingredientType } from '../../utils/types';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { addBun, addIngredient, deleteIngredient } from '../../services/actions/burger-constructor';

function BurgerConstructor( {openOrder} ) {
  const dispatch = useDispatch();
  const { bun, topping } = useSelector(store => store.constructor);

  function handleDrop(item) {
    if (item.type === "bun") {
      dispatch(addBun(item));
    } else {
      dispatch(addIngredient(item));
    }
  }

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      handleDrop(item);
    }
  });

  const deleteElement = (id) => {
    dispatch(deleteIngredient(id));
  }

  return (
    <section className={styles.section}>
      <div className={styles.borders} ref={dropTarget}>
        {bun ?
              <ConstructorElement
                type="top"
                isLocked={true}
                text={bun.name + " (верх)"}
                price={bun.price}
                thumbnail={bun.image}
              />
              :
              <ConstructorElement type="top" text="Нет булки" />
            }
      </div>
        <div className={styles.scrollableContainer}>
        {topping && Array.isArray(topping) && topping.map((cardData) => {
            return (
                <div key={cardData._id} className={styles.item}>
                    <DragIcon />
                    <ConstructorElement
                        text={cardData.name}
                        price={cardData.price}
                        thumbnail={cardData.image}
                        handleClose={() => deleteElement(cardData.id)}
                    />
                </div>
            )
        })}
        </div>
        <div className={styles.borders}>
        {bun ?
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={bun.name + " (низ)"}
              price={bun.price}
              thumbnail={bun.image}
            />
            :
            <ConstructorElement type="bottom" text="Нет булки" />
          }
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