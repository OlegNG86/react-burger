import { useMemo, useState } from "react";
import styles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { IIngredient } from "../../utils/types";
import { useDrop } from "react-dnd";
import {
  addBun,
  addIngredient,
} from "../../services/actions/burger-constructor";
import { getOrderId, resetOrderId } from "../../services/actions/order-details";
import { openModal, closeModal } from "../../services/actions/modal";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import SortableIngredient from "../sortable-ingredient/sortable-ingredient";
import { resetConstructor } from "../../services/actions/burger-constructor";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useNavigate } from "react-router-dom";

function BurgerConstructor() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.authorization.auth);
  const { bun, topping } = useAppSelector(
    (store) => store.burgerConstructor
  );
  const { isModalOpen } = useAppSelector((store) => store.modal);
  const { orderId } = useAppSelector((store) => store.order);
  const [isWaiting, setIsWaiting] = useState(false);

  const navigate = useNavigate()

  const calcTotalPrice = useMemo(() => {
    let totalPrice = 0;

    if (bun && 'price' in bun && bun.price) {
      totalPrice += bun.price * 2;
    }

    if (topping && topping.length > 0) {
      totalPrice += topping.reduce(
        (acc, curr) => acc + curr.price,
        0
      );
    }

    return totalPrice;
  }, [bun, topping]);

  function handleDrop(item: IIngredient) {
    if (item.type === "bun") {
      dispatch(addBun(item));
    } else {
      dispatch(addIngredient(item));
    }
  }



  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item: IIngredient) {
      handleDrop(item);
    },
  });

  const handleSubmit = () => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      if (!bun) {
        return;
      }
      const ingredientsId = [bun, ...topping, bun].map((item) => item._id);
      dispatch(getOrderId(ingredientsId));
      dispatch(resetConstructor());
      dispatch(openModal());
      setIsWaiting(true);
    }
  };

  function handleCloseModal() {
    // setOrderPath(`/profile/orders/${orderId}`)
    setIsWaiting(!isWaiting);
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
          <ConstructorElement
            type="top"
            text="Нет булки"
            thumbnail={""}
            price={0}
          />
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
          <ConstructorElement
            type="bottom"
            text="Нет булки"
            thumbnail={""}
            price={0}
          />
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
          disabled={!bun || !bun.name || isWaiting}
        >
          {isWaiting ? "Загрузка..." : "Оформить заказ"}
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
