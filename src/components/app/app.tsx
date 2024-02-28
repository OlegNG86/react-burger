import React, { useState, useEffect } from "react";
import style from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';

const API_URL = "https://norma.nomoreparties.space/api/ingredients";


const App = () => {
    const [ingredients, setIngredients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [orderDetails, setOrderDetails] = useState({ isOpened: false });
    const [ingredientDetails, setIngredientDetails] = useState({ isOpened: false, ingredient: null })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_URL);

                if (!response.ok) {
                    throw new Error("Ошибка при получении данных");
                }

                const responseData = await response.json();

                if (!responseData.success) {
                    throw new Error("Ошибка при получении данных");
                }

                setIngredients(responseData.data);
            } catch (error) {
                // @ts-ignore
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Загрузка данных...</div>;
    }

    if (error) {
        return <div>Произошла ошибка: {error}</div>;
    }

    const openOrderDetails = () => {
        setOrderDetails({ ...orderDetails, isOpened: true });
    }

    const handleItemClick = (ingredient: any) => {
        setIngredientDetails({ isOpened: true, ingredient: ingredient });
      };

    const closeAllModals = () => {
        setOrderDetails({ ...orderDetails, isOpened: false });
        setIngredientDetails({ ...ingredientDetails, isOpened: false });
    }

    console.log(orderDetails)
    return (
        <>
            <AppHeader />
            <main className={style.content}>
                <BurgerIngredients cardsData={ingredients} onItemClick={handleItemClick} />
                <BurgerConstructor openOrder={openOrderDetails} ingredients={ingredients} />
            </main>
            {orderDetails.isOpened &&
                <Modal
                    onClose={closeAllModals}>
                    <OrderDetails orderId={`034536`} />
                </Modal>}
            {ingredientDetails.isOpened &&
                <Modal
                    title={'Детали ингредиента'}
                    onClose={closeAllModals}>
                    <IngredientDetails ingredientData={ingredientDetails.ingredient} />
                </Modal>}
        </>

    );
};



export default App;