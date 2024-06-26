import styles from "./order-details.module.css";
import iconDone from "../../images/icon-done.png";
import { useAppSelector } from "../../hooks/redux";

function OrderDetails() {
  const { orderId } = useAppSelector((store) => store.order);

  return (
    <div className={styles.order} data-cy="order-details">
      <h2
        className={`text text_type_digits-large mt-30 mb-8 ${styles.order__title}`}
        data-cy="order-id"
      >
        {orderId}
      </h2>
      <p className={`text text_type_main-medium ${styles.order__id}`}>
        Идентификатор заказа
      </p>
      <img
        className={`mt-15 mb-15 ${styles.order__image}`}
        src={iconDone}
        alt="Ваш заказ принят"
      />
      <p className={`text text_type_main-default ${styles.order__description}`}>
        Ваш заказ начали готовить
      </p>
      <p
        className={`text text_type_main-default mt-2 mb-30 ${styles.order__descriptionReady}`}
      >
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

export default OrderDetails;
