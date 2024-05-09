import { useParams } from "react-router-dom";
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import { IIngredient } from "../utils/types";
import { useAppSelector } from "../hooks/redux";
import { getOrder } from "../utils/connector";
import styles from "./order.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";


const OrderPage = () => {
  // const { number } = useParams<{ number: string }>();

  // const orders = useAppSelector((state) => state.orders.orders);
  

  // const orderId = Number(number); // используем parseInt для преобразования строки в число
  // const order = orders.find((item) => item.number === orderId);
  // const ingredients = useAppSelector((state) => state.ingredients.data);
  
  // if (order) {
  //   console.log("console.log => order", order)

  // } else {
  //   console.log("Заказ не найден");
  //   console.log("orderId = ", orderId);
  //   const fetchOrders = getOrder(orderId);
  //   console.log(fetchOrders);
  // }


  // const getIngredientData = (_id: string): IIngredient | undefined => {
  //   return order ? ingredients.find((ingredient) => ingredient._id === _id) : undefined};

  //   const updatedOrder = () => {
  //     const ingredientsData: IIngredient[] = order?.ingredients
  //       .map((ingredientId) => getIngredientData(ingredientId))
  //       .filter(Boolean) as IIngredient[];
  
  
  //     const total = ingredientsData.reduce((acc, ingredient) => acc + ingredient!.price, 0);
  
  //     return {
  //       number: `${order?.number}`, // исправлено на _id
  //       foodName: order?.name, // исправлено на name
  //       icons: ingredientsData.map((ingredient) => ({ src: ingredient!.image_large, alt: ingredient!.name, width: '112 56' })),
  //       date: new Date(order?.createdAt!).toLocaleString(),
  //       total: total
  //     };
  // };

  return (
    // <div>
    //   {order ? (
    //     // <IngredientDetails ingredientData={order} />
    //     <div>Заказ найден</div>
    //   ) : (
    //     <div>Заказ не найден</div>
    //   )}
    // </div>

      <section className={styles.cardOrder}>
        <div className={styles.numberOrder}>#034533</div>
        <h3 className={styles.foodName}>Black Hole Singularity острый бургер</h3>
        <p className={styles.wordDone}>Выполнен</p>
   
      <ul className={styles.allIngredients}>
        <h3 className={styles.titleIngredients}>Состав:</h3>
        <li className={styles.IngredientsItems}>
           <div className={styles.coverIconsItem}>
           <img className={styles.iconsItem} src="https://code.s3.yandex.net/react/code/bun-02.png"></img>
          </div>
          <p className={styles.nameIngredient}>Флюоресцентная булка R2-D3</p>
          <p className={styles.numbersQuantity}>2 x 300 <span className={styles.iconTotal}>{<CurrencyIcon type={"primary"}/>}</span></p>
        </li>
        <li className={styles.IngredientsItems}>
        <div className={styles.coverIconsItem}>
           <img className={styles.iconsItem} src="https://code.s3.yandex.net/react/code/bun-02.png"></img>
          </div>
          <p className={styles.nameIngredient}>Флюоресцентная булка R2-D3</p>
          <p className={styles.numbersQuantity}>2 x 300 <span className={styles.iconTotal}>{<CurrencyIcon type={"primary"}/>}</span></p>
        </li>
        <li className={styles.IngredientsItems}>
        <div className={styles.coverIconsItem}>
           <img className={styles.iconsItem} src="https://code.s3.yandex.net/react/code/bun-02.png"></img>
          </div>
          <p className={styles.nameIngredient}>Флюоресцентная булка R2-D3</p>
          <p className={styles.numbersQuantity}>2 x 300 <span className={styles.iconTotal}>{<CurrencyIcon type={"primary"}/>}</span></p>
        </li>
      </ul>
      <div className={styles.dateOrderCard}>
        <p className={styles.dateOrder}>Вчера, 13:50</p>
        <p className={styles.totalItem}>300
         <span className={styles.iconTotal}>{<CurrencyIcon type={"primary"}/>}</span>
        </p> 
      </div>
      </section>
  );
};

export default OrderPage;
