import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { getOrderObject } from "../services/actions/order-details";
import { useEffect } from "react";
import OrderDetailsPage from "./order-details";

const OrderPage = () => {
  const { number } = useParams();
  const orders = useAppSelector((state) => state.order.orderObject);

  const dispatch = useAppDispatch();
  const ingredients = useAppSelector((state) => state.ingredients.data);
  const orderId = Number(number);

  useEffect(() => {
    dispatch(getOrderObject(orderId));
  }, [dispatch, orderId]);

  interface IOrderIngredient {
    count: number;
    image_large: string;
    name: string;
    price: number;
    priceByCount: number;
  }

  const updatedOrders = orders.map((order) => {

    const ingredientsInfo: Record<string, IOrderIngredient> = {};

    orders.forEach((order) => {
      order.ingredients.forEach((ingredientId) => {
        const ingredient = ingredients.find((i) => i._id === ingredientId);
        if (ingredient) {
          if (ingredientsInfo[ingredientId]) {
            ingredientsInfo[ingredientId].count++;
            ingredientsInfo[ingredientId].priceByCount += ingredient.price;
          } else {
            ingredientsInfo[ingredientId] = {
              count: 1,
              image_large: ingredient.image_large,
              name: ingredient.name,
              price: ingredient.price,
              priceByCount: ingredient.price,
            };
          }
        }
      });
    });

    let total = 0;

    for (const ingredientId in ingredientsInfo) {
      total += ingredientsInfo[ingredientId].priceByCount;
    }

    return {
      number: `${order.number}`,
      foodName: order.name,
      ingredients: Object.values(ingredientsInfo).map(
        (ingredient: IOrderIngredient) => ({
          count: ingredient.count,
          image_large: ingredient.image_large,
          name: ingredient.name,
          price: ingredient.price,
          priceByCount: ingredient.priceByCount,
        })
      ),
      date: new Date(order.createdAt).toLocaleString(),
      total: total,
    };
  });

  return (
    <>
      {updatedOrders.map((order, index) => (
        <OrderDetailsPage
          key={index}
          number={order.number}
          foodName={order.foodName}
          ingredients={order.ingredients}
          date={order.date}
          total={order.total}
        />
      ))}
    </>
  );
};

export default OrderPage;
