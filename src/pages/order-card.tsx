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
  // Determine the number of icons to display and the hidden count
  const maxIconsToShow = 6;
  const iconsToShow = icons.slice(0, maxIconsToShow);
  const hiddenIconsCount = icons.length - maxIconsToShow;

  return (
    <li className={styles.listsItem}>
      <div className={styles.coverItem}>
        <p className={styles.numberOrder}>#{number}</p>
        <p className={styles.foodName}>{foodName}</p>
        <div className={styles.iconsFood}>
          {iconsToShow.map((icon, index) => (
            <div key={index} className={styles.coverIconsItem}>
              <img
                className={styles.iconsItem}
                src={icon.src}
                alt={icon.alt}
                width={icon.width}
              />
            </div>
          ))}
          {hiddenIconsCount > 0 && (
            <div className={styles.coverIconsItem}>
              <span className={styles.hiddenIconsCount}>
                +{hiddenIconsCount}
              </span>
            </div>
          )}
        </div>
        <div className={styles.dateOrderList}>
          <p className={styles.dateOrder}>{date}</p>
          <div className={styles.totalItem}>
            {total}
            <div className={styles.icon}>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default OrderCard;
