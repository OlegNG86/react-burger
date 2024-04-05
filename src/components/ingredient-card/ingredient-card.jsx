import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useDrag} from "react-dnd";
import {
	Counter,
	CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient-card.module.css";
import PropTypes from "prop-types";
import {ingredientType} from "../../utils/types";
import {openModal, closeModal} from "../../services/actions/modal";
import {Link, useLocation} from "react-router-dom";

function IngredientCard({ingredient, count}) {
	const location = useLocation();
	
	const [, dragRef] = useDrag({
		type: "ingredient",
		item: ingredient,
	});
	
	return (
		<>
			<Link
				to={`/ingredient/${ingredient._id}`}
				state={{...location?.state, backgroundLocation: location}}
				className={styles.card}
				ref={dragRef}
			>
				{" "}
				{count > 0 && <Counter count={count} size="default"/>}
				<img
					src={ingredient.image}
					alt={ingredient.name}
					className={styles.card__image}
				></img>
				<div className={styles.card__price}>
					<p className={styles.p}>{ingredient.price}</p>
					<CurrencyIcon type="primary"/>
				</div>
				<p className={`text text_type_main-small ${styles.card__name}`}>
					{ingredient.name}
				</p>
			</Link>
		</>
	);
}

IngredientCard.propTypes = {
	ingredient: ingredientType.isRequired,
	count: PropTypes.number.isRequired,
};

export default IngredientCard;
