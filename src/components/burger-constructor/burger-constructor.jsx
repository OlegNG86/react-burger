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
import SortableIngredient from "../sortable-ingredient/sortable-ingredient";
import { resetConstructor } from "../../services/actions/burger-constructor";

function BurgerConstructor() {
  const dispatch = useDispatch();
  const { bun, topping } = useSelector((store) => store.burgerConstructor);
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

  const deleteElement = (uniqueId) => {
    dispatch(deleteIngredient(uniqueId));
  };

  const handleSubmit = () => {
    const ingredientsId = [bun, ...topping, bun].map((item) => item._id);
    dispatch(getOrderId(ingredientsId));
    dispatch(resetConstructor());
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
          topping.map((cardData, index) => (
            <SortableIngredient
              key={cardData.uniqueId}
              cardData={cardData}
              index={index}
            />
          ))}
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
          disabled={!bun || !bun.name}
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
