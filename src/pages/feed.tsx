import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  FEED_CONNECTION_CLOSE,
  FEED_CONNECTION_INIT,
} from "../services/actions/feed";
import { WSS_URL } from "../utils/connector";
import styles from "./feed.module.css";
import { IIngredient, TOrder } from "../utils/types";
import OrderCard from "./order-card";
import { Link, useLocation } from "react-router-dom";

const FeedPage = () => {
  const dispatch = useAppDispatch();
  const allOrdersURL = `${WSS_URL}/all`;

  useEffect(() => {
    dispatch({
      type: FEED_CONNECTION_INIT,
      payload: allOrdersURL,
    });

    return () => {
      dispatch({ type: FEED_CONNECTION_CLOSE });
    };
  }, [dispatch, allOrdersURL]);

  const feed = useAppSelector((state) => state.feed);
  const ingredients = useAppSelector((state) => state.ingredients.data);

  const getIngredientData = (_id: string): IIngredient | undefined => {
    return ingredients.find((ingredient) => ingredient._id === _id);
  };

  const updatedOrders = feed.orders.map((order: TOrder) => {
    const ingredientsData: IIngredient[] = order.ingredients
      .map((ingredientId) => getIngredientData(ingredientId))
      .filter(Boolean) as IIngredient[];

    const total = ingredientsData.reduce(
      (acc, ingredient) => acc + ingredient.price,
      0
    );

    return {
      number: order.number.toString(),
      foodName: order.name,
      icons: ingredientsData.map((ingredient) => ({
        src: ingredient.image_large,
        alt: ingredient.name,
        width: "112",
        height: "56",
      })),
      date: new Date(order.createdAt).toLocaleString(),
      total: total,
      status: order.status,
    };
  });

  const doneOrders = updatedOrders.filter((order) => order.status === "done");
  const inProgressOrders = updatedOrders.filter(
    (order) => order.status !== "done"
  );
  const location = useLocation();
  return (
    <main className={styles.container}>
      <h1
        className={`${styles.titleContainer} text text_type_main-large mt-10 mb-5`}
      >
        Лента заказов
      </h1>
      <section className={styles.sectionContainerTable}>
        <ul className={styles.orderLists}>
          {updatedOrders.map((order, index) => (
            <Link
              to={`/feed/${order.number}`}
              state={{ ...location?.state, backgroundLocation: location }}
              className={styles.linkLocation}
              key={order.number}
            >
              {" "}
              <OrderCard
                key={index}
                number={order.number}
                foodName={order.foodName}
                icons={order.icons}
                date={order.date}
                total={order.total}
              />
            </Link>
          ))}
        </ul>
        <ul className={styles.totalLists}>
          <li className={styles.totalListItems}>
            <ul className={styles.totalList}>
              <li className={styles.numbersOrderList}>
                <h3 className={styles.titleTotalList}>Готовы:</h3>
                {doneOrders.map((order, index) => (
                  <p className={styles.numbersOrderItem} key={index}>
                    {order.number}
                  </p>
                ))}
              </li>
              <li className={styles.numbersOrderList}>
                <h3 className={styles.titleTotalList}>В работе</h3>
                {inProgressOrders.map((order, index) => (
                  <p className={styles.numbersOrderItem} key={index}>
                    {order.number}
                  </p>
                ))}
              </li>
            </ul>
          </li>
          <li className={styles.totalListItems}>
            <h3 className={styles.titleTotalfood}>
              Выполнено за всё время:
              <span className={styles.totalFoodSum}>{feed.total}</span>
            </h3>
          </li>
          <li className={styles.totalListItems}>
            <h3 className={styles.titleTotalfood}>
              Выполнено за сегодня:
              <span className={styles.totalFoodSum}>{feed.totalToday}</span>
            </h3>
          </li>
        </ul>
      </section>
    </main>
  );
};

export default FeedPage;
