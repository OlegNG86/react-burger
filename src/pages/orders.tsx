import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  ORDERS_CONNECTION_CLOSE,
  ORDERS_CONNECTION_INIT,
} from "../services/actions/orders";
import { WSS_URL } from "../utils/connector";
import styles from "./orders.module.css";
import { IIngredient } from "../utils/types";
import { getTokens } from "../utils/persistant-token";
import OrderCard from "./order-card";

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
  }, [dispatch, myOrdersURL]);

  const ingredients = useAppSelector((state) => state.ingredients.data);
  const orders = useAppSelector((state) => state.orders.orders);

  const getIngredientData = (_id: string): IIngredient | undefined => {
    return ingredients.find((ingredient) => ingredient._id === _id);
  };

  const updatedOrders = orders.map((order) => {
    const ingredientsData: IIngredient[] = order.ingredients
      .map((ingredientId) => getIngredientData(ingredientId))
      .filter(Boolean) as IIngredient[];

    const total = ingredientsData.reduce(
      (acc, ingredient) => acc + ingredient.price,
      0
    );

    return {
      number: `${order.number}`, // исправлено на _id
      foodName: order.name, // исправлено на name
      icons: ingredientsData.map((ingredient) => ({
        src: ingredient.image_large,
        alt: ingredient.name,
        width: "112 56",
      })),
      date: new Date(order.createdAt).toLocaleString(),
      total: total,
    };
  });

  return (
    <main className={styles.container}>
      <section className={styles.sectionContainerHistory}>
        <ul className={styles.orderLists}>
          {updatedOrders.map((order, index) => (
            <OrderCard
              key={index}
              number={order.number}
              foodName={order.foodName}
              icons={order.icons}
              date={order.date}
              total={order.total}
            />
          ))}
        </ul>
      </section>
    </main>
  );
};

export default OrdersPage;
