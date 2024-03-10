import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import style from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import { openModal, closeModal } from '../../services/actions/modal';


const App = () => {
    const dispatch = useDispatch();
    const [orderDetails, setOrderDetails] = useState({ isOpened: false });
    const [ingredientDetails, setIngredientDetails] = useState({ isOpened: false, ingredient: null })

    const openOrderDetails = () => {
        setOrderDetails({ ...orderDetails, isOpened: true });
    }

    const handleItemClick = (ingredient) => {
        setIngredientDetails({ isOpened: true, ingredient: ingredient });
      };

    const closeAllModals = () => {
        setOrderDetails({ ...orderDetails, isOpened: false });
        setIngredientDetails({ ...ingredientDetails, isOpened: false });
    }

    return (
        <>
            <AppHeader />
            <DndProvider backend={HTML5Backend}>
            <main className={style.content}>
                <BurgerIngredients onItemClick={handleItemClick} />
                <BurgerConstructor openOrder={openOrderDetails} />
            </main>
            {orderDetails.isOpened &&
                <Modal
                    onClose={closeAllModals}>
                    <OrderDetails orderId={`034536`} />
                </Modal>}
            </DndProvider>
        </>

    );
};



export default App;