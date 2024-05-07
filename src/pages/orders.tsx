import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  ORDERS_CONNECTION_CLOSE,
  ORDERS_CONNECTION_INIT,
} from "../services/actions/orders";
import { WSS_URL } from "../utils/connector";
import styles from "./orders.module.css";
import { IIngredient } from "../utils/types";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { getTokens } from "../utils/persistant-token";
import OrderCard from "./order-card";
import { TOrderCard } from "../utils/types";

const OrdersPage: React.FC = () => {
  const accessToken = getTokens().accessToken.slice(7);
  const dispatch = useAppDispatch();
  const myOrdersURL = `${WSS_URL}?token=${accessToken}`;

  useEffect(() => {
    dispatch({
      type: ORDERS_CONNECTION_INIT,
      payload: myOrdersURL,
    });

    return () => {
      dispatch({ type: ORDERS_CONNECTION_CLOSE });
    };
  }, [dispatch]);

  const feed = useAppSelector((state) => state.feed);

  const orders: TOrderCard[] = [
    {
      number: '#034535',
      foodName: 'Death Star Starship Main бургер',
      icons: [
        { src: 'https://code.s3.yandex.net/react/code/bun-02-large.png', alt: 'icon1', width: '112 56' },
        { src: 'https://code.s3.yandex.net/react/code/bun-02-large.png', alt: 'icon1', width: '112 56' },
        { src: 'https://code.s3.yandex.net/react/code/bun-02-large.png', alt: 'icon1', width: '112 56' },
      ],
      date: 'Сегодня, 16:20',
      total: 480
    },
    {
      number: '#034536',
      foodName: 'Another Burger',
      icons: [
        { src: 'https://code.s3.yandex.net/react/code/bun-02-large.png', alt: 'icon1', width: '112 56' },
        { src: 'https://code.s3.yandex.net/react/code/bun-02-large.png', alt: 'icon1', width: '112 56' },
        { src: 'https://code.s3.yandex.net/react/code/bun-02-large.png', alt: 'icon1', width: '112 56' },
        { src: 'https://code.s3.yandex.net/react/code/bun-02-large.png', alt: 'icon1', width: '112 56' },
        { src: 'https://code.s3.yandex.net/react/code/bun-02-large.png', alt: 'icon1', width: '112 56' },
        { src: 'https://code.s3.yandex.net/react/code/bun-02-large.png', alt: 'icon1', width: '112 56' },
        { src: 'https://code.s3.yandex.net/react/code/bun-02-large.png', alt: 'icon1', width: '112 56' },
        { src: 'https://code.s3.yandex.net/react/code/bun-02-large.png', alt: 'icon1', width: '112 56' },
        { src: 'https://code.s3.yandex.net/react/code/bun-02-large.png', alt: 'icon1', width: '112 56' },
      ],
      date: 'Сегодня, 17:30',
      total: 520
    },
  ];

  return (
    <main className={styles.container}>
      <section className={styles.sectionContainerHistory}>
        <ul className={styles.orderLists}>
          {orders.map((order, index) => (
            <OrderCard key={index} {...order} />
          ))}
        </ul>
      </section>
    </main>
  );
};

export default OrdersPage;