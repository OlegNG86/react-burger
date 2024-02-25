import React, { useState, useEffect } from "react";
import style from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import PropTypes from "prop-types";

const API_URL = "https://norma.nomoreparties.space/api/ingredients";

const App = () => {
    const [ingredients, setIngredients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                setLoading(false);
            } catch (error) {
                // @ts-ignore
                setError(error.message);
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

    // @ts-ignore
    return (
        <div>
            <h1>Список ингредиентов:</h1>
            <ul>
                
            </ul>
        </div>
    );
};

App.propTypes = {
    ingredients: PropTypes.arrayOf(
        PropTypes.arrayOf(
            PropTypes.shape({
                _id: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
                type: PropTypes.string.isRequired,
                proteins: PropTypes.number.isRequired,
                fat: PropTypes.number.isRequired,
                carbohydrates: PropTypes.number.isRequired,
                calories: PropTypes.number.isRequired,
                price: PropTypes.number.isRequired,
                image: PropTypes.string.isRequired,
                image_mobile: PropTypes.string.isRequired,
                image_large: PropTypes.string.isRequired,
                __v: PropTypes.number.isRequired
            })
        )
    ).isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
};

export default App;