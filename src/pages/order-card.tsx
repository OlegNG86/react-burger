import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-card.module.css";
import { TOrderCard } from "../utils/types";

const OrderCard: React.FC<TOrderCard> = ({
  number,
  foodName,
  icons,
  date,
  total,
}) => {
  return (
      <li className={styles.listsItem}>
        <div className={styles.coverItem}>
          <p className={styles.numberOrder}>#{number}</p>
          <p className={styles.foodName}>{foodName}</p>
          <p className={styles.iconsFood}>
            {icons.map((icon, index) => (
              <div key={index} className={styles.coverIconsItem}>
                <img
                  className={styles.iconsItem}
                  src={icon.src}
                  alt={icon.alt}
                  width={icon.width}
                ></img>
              </div>
            ))}
          </p>
          <div className={styles.dateOrderList}>
            <p className={styles.dateOrder}>{date}</p>
            <p className={styles.totalItem}>
              {total}
              <div className={styles.icon}>
                {" "}
                <CurrencyIcon type="primary" />
              </div>
            </p>
          </div>
        </div>
      </li>
  );
};

export default OrderCard;
