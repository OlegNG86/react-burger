import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  FEED_CONNECTION_CLOSE,
  FEED_CONNECTION_INIT,
} from "../services/actions/feed";
import { WSS_URL } from "../utils/connector";
import styles from "./feed.module.css";
import { IIngredient } from "../utils/types";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

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
  }, [dispatch]);

  const feed = useAppSelector((state) => state.feed);

  // const feedIngredients = feed.orders.map((feed) => {
  // const ingredient = ingredients.find((ing) => ing._id === feed._id);
  // if (ingredient) {
  //     return ingredient.name;
  // } else {
  //     return "Unknown ingredient";
  // }
  // });

  // const firstOrder = feed.orders[0].ingredients;

  return (
    <main className={styles.container}>
      <h1 className={`${styles.titleContainer} text text_type_main-large mt-10 mb-5`}>
        Лента заказов
      </h1>
      <section className={styles.sectionContainerTable}>
        <ul className={styles.orderLists}>
          <li className={styles.listsItem}>
            <div className={styles.coverItem}>
              <p className={styles.numberOrder}>#034535</p>
              <p className={styles.foodName}>Death Star Starship Main бургер</p>
              <p className={styles.iconsFood}>
                <div className={styles.coverIconsItem}>
                <img
                  className={styles.iconsItem}
                  src="https://code.s3.yandex.net/react/code/bun-02-large.png"
                  width="112 56"
                ></img>
                </div>
                <div className={styles.coverIconsItem}>
                <img
                  className={styles.iconsItem}
                  src="https://code.s3.yandex.net/react/code/bun-02-large.png"
                  width="112 56"
                ></img>
                </div>
                <div className={styles.coverIconsItem}>
                <img
                  className={styles.iconsItem}
                  src="https://code.s3.yandex.net/react/code/bun-02-large.png"
                  width="112 56"
                ></img>
                </div>
              </p>
              <p className={styles.dateOrder}>Сегодня, 16:20</p>
              <p className={styles.totalItem}>
                480
                <div className={styles.icon}>
                  {" "}
                  <CurrencyIcon type="primary" />
                </div>
              </p>
            </div>
          </li>
          <li className={styles.listsItem}>
            <div className={styles.coverItem}>
              <p className={styles.numberOrder}>#034535</p>
              <p className={styles.foodName}>
                BLack Hole Singularity острый бургер
              </p>
              <p className={styles.iconsFood}>
                <div className={styles.coverIconsItem}>
                <img
                  className={styles.iconsItem}
                  src="https://code.s3.yandex.net/react/code/bun-02-large.png"
                  width="112 56"
                ></img>
                </div>
                <div className={styles.coverIconsItem}>
                <img
                  className={styles.iconsItem}
                  src="https://code.s3.yandex.net/react/code/bun-02-large.png"
                  width="112 56"
                ></img>
                </div>
                <div className={styles.coverIconsItem}>
                <img
                  className={styles.iconsItem}
                  src="https://code.s3.yandex.net/react/code/bun-02-large.png"
                  width="112 56"
                ></img>
                </div>
              </p>
              <p className={styles.dateOrder}>Сегодня, 16:20</p>
              <p className={styles.totalItem}>
                480
                <div className={styles.icon}>
                  {" "}
                  <CurrencyIcon type="primary" />
                </div>
              </p>
            </div>
          </li>
          <li className={styles.listsItem}>
            <div className={styles.coverItem}>
              <p className={styles.numberOrder}>#034534</p>
              <p className={styles.foodName}>Interstellar бургер</p>
              <p className={styles.iconsFood}>
                <div className={styles.coverIconsItem}>
                <img
                  className={styles.iconsItem}
                  src="https://code.s3.yandex.net/react/code/bun-02-large.png"
                  width="112 56"
                ></img>
                </div>
                <div className={styles.coverIconsItem}>
                <img
                  className={styles.iconsItem}
                  src="https://code.s3.yandex.net/react/code/bun-02-large.png"
                  width="112 56"
                ></img>
                </div>
                <div className={styles.coverIconsItem}>
                <img
                  className={styles.iconsItem}
                  src="https://code.s3.yandex.net/react/code/bun-02-large.png"
                  width="112 56"
                ></img>
                </div>
              </p>
              <p className={styles.dateOrder}>Сегодня, 13:20</p>
              <p className={styles.totalItem}>
                560
                <div className={styles.icon}>
                  {" "}
                  <CurrencyIcon type="primary" />
                </div>
              </p>
            </div>
            <li className={styles.listsItem}>
            <div className={styles.coverItem}>
              <p className={styles.numberOrder}>#034535</p>
              <p className={styles.foodName}>Death Star Starship Main бургер</p>
              <p className={styles.iconsFood}>
                <div className={styles.coverIconsItem}>
                <img
                  className={styles.iconsItem}
                  src="https://code.s3.yandex.net/react/code/bun-02-large.png"
                  width="112 56"
                ></img>
                </div>
                <div className={styles.coverIconsItem}>
                <img
                  className={styles.iconsItem}
                  src="https://code.s3.yandex.net/react/code/bun-02-large.png"
                  width="112 56"
                ></img>
                </div>
                <div className={styles.coverIconsItem}>
                <img
                  className={styles.iconsItem}
                  src="https://code.s3.yandex.net/react/code/bun-02-large.png"
                  width="112 56"
                ></img>
                </div>
              </p>
              <p className={styles.dateOrder}>Сегодня, 16:20</p>
              <p className={styles.totalItem}>
                480
                <div className={styles.icon}>
                  {" "}
                  <CurrencyIcon type="primary" />
                </div>
              </p>
            </div>
          </li>
          </li>
        </ul>
        <ul className={styles.totalLists}>
          <li className={styles.totalListItems}>
            <ul className={styles.totalList}>
              <li className={styles.numbersOrderList}>
                <h3 className={styles.titleTotalList}>Готовы:</h3>
                <p className={styles.numbersOrderItem}>034533</p>
                <p className={styles.numbersOrderItem}>034533</p>
                <p className={styles.numbersOrderItem}>034533</p>
              </li>
              <li className={styles.numbersOrderList}>
                <h3 className={styles.titleTotalList}>В работе</h3>
                <p className={styles.numbersOrderItem}>034533</p>
                <p className={styles.numbersOrderItem}>034533</p>
                <p className={styles.numbersOrderItem}>034533</p>
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
            <span className={styles.totalFoodSum}> {feed.totalToday}</span>
          </h3>
        </li>
        <div className={styles.main}>
          <div className={styles.columnOrders}></div>
          <div className={styles.columnInfo}></div>
        </div>
        </ul>
      </section>
    </main>
  );
};

export default FeedPage;
