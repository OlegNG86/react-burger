import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { ORDERS_CONNECTION_CLOSE, ORDERS_CONNECTION_INIT } from "../services/actions/orders";
import { WSS_URL } from "../utils/connector";
import styles from './orders.module.css';
import { IIngredient } from "../utils/types";

const OrdersPage = () => {
    const dispatch = useAppDispatch();
    const allOrdersURL = `${WSS_URL}/all`

    useEffect(() => {
        dispatch({
            type: ORDERS_CONNECTION_INIT,
            payload: allOrdersURL,
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
            <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5`}>
                История заказов
            </h1>
            <section className={styles.sectionTable} >
             <ul className={styles.orderLists} >
                <li className={styles.listsItem}>
                 <div className={styles.coverItem}></div>
                 <p className={styles.numberOrder}>#034535</p>
                 <p className={styles.foodName}>Death Star Starship Main бургер</p>
                 <p className={styles.iconsFood}>
                    <img className={styles.iconsItem} src="https://code.s3.yandex.net/react/code/bun-02-large.png" width="64 64"></img>
                    <img className={styles.iconsItem} src="https://code.s3.yandex.net/react/code/bun-02-large.png" width="64 64"></img>
                    <img className={styles.iconsItem} src="https://code.s3.yandex.net/react/code/bun-02-large.png" width="64 64"></img>
                 </p>
                 <p className={styles.dateOrder}>Сегодня, 16:20</p>
                 <p className={styles.totalItem}>480
                 <img className={styles.totalIcon}></img>
                 </p>
                </li>
                <li className={styles.listsItem}>
                 <div className={styles.coverItem}></div>
                 <p className={styles.numberOrder}>#034535</p>
                 <p className={styles.foodName}>BLack Hole Singularity острый бургер</p>
                 <p className={styles.iconsFood}>
                    <img className={styles.iconsItem} src="https://code.s3.yandex.net/react/code/bun-02-large.png" width="64 64"></img>
                    <img className={styles.iconsItem} src="https://code.s3.yandex.net/react/code/bun-02-large.png" width="64 64"></img>
                    <img className={styles.iconsItem} src="https://code.s3.yandex.net/react/code/bun-02-large.png" width="64 64"></img>
                 </p>
                 <p className={styles.dateOrder}>Сегодня, 16:20</p>
                 <p className={styles.totalItem}>480
                 <img className={styles.totalIcon}></img>
                 </p>
                </li>
                <li className={styles.listsItem}>
                 <div className={styles.coverItem}></div>
                 <p className={styles.numberOrder}>#034534</p>
                 <p className={styles.foodName}>Interstellar бургер</p>
                 <p className={styles.iconsFood}>
                    <img className={styles.iconsItem} src="https://code.s3.yandex.net/react/code/bun-02-large.png" width="64 64"></img>
                    <img className={styles.iconsItem} src="https://code.s3.yandex.net/react/code/bun-02-large.png" width="64 64"></img>
                    <img className={styles.iconsItem} src="https://code.s3.yandex.net/react/code/bun-02-large.png" width="64 64"></img>
                 </p>
                 <p className={styles.dateOrder}>Сегодня, 13:20</p>
                 <p className={styles.totalItem}>560
                 <img className={styles.totalIcon} src=""></img>
                 </p>
                </li>
             </ul>
             <ul className={styles.totalLists} >
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
             </ul>

            <div>
                Выполнено за всё время {feed.total}
            </div>
            <div>
                {/* Первый заказ: {firstOrder} */}
            </div>
            <div className={styles.main}>
                <div className={styles.columnOrders}>

                </div>
                <div className={styles.columnInfo}>
                    
                </div>
            </div>
            </section>
        </main>
    )
}

export default OrdersPage;