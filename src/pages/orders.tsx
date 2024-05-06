import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { ORDERS_CONNECTION_CLOSE, ORDERS_CONNECTION_INIT } from "../services/actions/orders";
import { WSS_URL } from "../utils/connector";
import styles from './orders.module.css';
import { IIngredient } from "../utils/types";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { getTokens } from "../utils/persistant-token";

const OrdersPage = () => {
    const accessToken = getTokens().accessToken.slice(7);
    const dispatch = useAppDispatch();
    const myOrdersURL = `${WSS_URL}?token=${accessToken}`;
    console.log(accessToken)

    useEffect(() => {
        dispatch({
            type: ORDERS_CONNECTION_INIT,
            payload: myOrdersURL,
        });

        return () => {
            dispatch({ type: ORDERS_CONNECTION_CLOSE })
        };
    }, [dispatch])

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
    
            <section className={styles.sectionContainerHistory}>
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
        </section>
        </main>
    )
}

export default OrdersPage;