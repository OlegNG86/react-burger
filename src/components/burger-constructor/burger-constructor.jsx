import React, { useMemo } from "react";
import PropTypes from "prop-types";
import styles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientType } from "../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import {
  addBun,
  addIngredient,
  deleteIngredient,
} from "../../services/actions/burger-constructor";
import { getOrderId, resetOrderId } from "../../services/actions/order-details";
import { openModal, closeModal } from "../../services/actions/modal";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

function BurgerConstructor() {
  const dispatch = useDispatch();
  const { bun, topping } = useSelector((store) => store.constructor);
  const { isModalOpen } = useSelector((store) => store.modal);
  const { orderId, error } = useSelector((store) => store.order);

  const calcTotalPrice = useMemo(() => {
    let totalPrice = 0;

    if (bun && bun.price) {
      totalPrice += bun.price * 2;
    }

    if (topping && topping.length > 0) {
      totalPrice += topping.reduce((acc, curr) => acc + curr.price, 0);
    }

    return totalPrice;
  }, [bun, topping]);

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
    },
  });

  const deleteElement = (id) => {
    dispatch(deleteIngredient(id));
  };

  const handleSubmit = () => {
    const ingredientsId = [bun, ...topping, bun].map((item) => item._id);
    dispatch(getOrderId(ingredientsId));
    dispatch(openModal());
  };

  function handleCloseModal() {
    dispatch(closeModal());
    dispatch(resetOrderId());
  }

  return (
    <section className={styles.section}>
      <div className={styles.borders} ref={dropTarget}>
        {bun ? (
          <ConstructorElement
            type="top"
            isLocked={true}
            text={bun.name + " (верх)"}
            price={bun.price}
            thumbnail={bun.image}
          />
        ) : (
          <ConstructorElement type="top" text="Нет булки" />
        )}
      </div>
      <div className={styles.scrollableContainer}>
        {topping &&
          Array.isArray(topping) &&
          topping.map((cardData) => {
            return (
              <div key={cardData.uniqueId} className={styles.item}>
                <DragIcon />
                <ConstructorElement
                  text={cardData.name}
                  price={cardData.price}
                  thumbnail={cardData.image}
                  handleClose={() => deleteElement(cardData.id)}
                />
              </div>
            );
          })}
      </div>
      <div className={styles.borders}>
        {bun ? (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={bun.name + " (низ)"}
            price={bun.price}
            thumbnail={bun.image}
          />
        ) : (
          <ConstructorElement type="bottom" text="Нет булки" />
        )}
      </div>
      <div className={styles.orderButton}>
        <p className={styles.text}>{calcTotalPrice}</p>
        <div className={styles.icon}>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="submit"
          type="primary"
          size="large"
          onClick={handleSubmit}
        >
          Оформить заказ
        </Button>
        {isModalOpen && orderId && (
          <Modal onClose={handleCloseModal}>
            <OrderDetails />
          </Modal>
        )}
      </div>
    </section>
  );
}

export default BurgerConstructor;

BurgerConstructor.propTypes = {
  openOrder: PropTypes.func.isRequired,
};
