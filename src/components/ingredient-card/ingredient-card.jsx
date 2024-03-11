import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient-card.module.css";
import PropTypes from "prop-types";
import { ingredientType } from "../../utils/types";
import {
  showIngredientInModal,
  deleteIngredientFromModal,
} from "../../services/actions/ingredient-details";
import { openModal, closeModal } from "../../services/actions/modal";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

function IngredientCard({ ingredient }) {
  const [localCount, setLocalCount] = useState(0);

  const { isModalOpen } = useSelector((store) => store.modal);
  const { selectedIngredient } = useSelector(
    (store) => store.ingredientDetails
  );
  const dispatch = useDispatch();

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
  });

  function handleOpenModal() {
    dispatch(showIngredientInModal(ingredient));
    dispatch(openModal());
  }

  function handleCloseModal() {
    dispatch(deleteIngredientFromModal(ingredient));
    dispatch(closeModal());
  }

  return (
    <>
      <li
        key={ingredient._id}
        className={styles.card}
        onClick={handleOpenModal}
        ref={dragRef}
      >
        <Counter count={localCount} size="default" />
        <img
          src={ingredient.image}
          alt={ingredient.name}
          className={styles.card__image}
        ></img>
        <div className={styles.card__price}>
          <p className={styles.p}>{ingredient.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`text text_type_main-small ${styles.card__name}`}>
          {ingredient.name}
        </p>
      </li>
      {isModalOpen && (
        <Modal title={"Детали ингредиента"} onClose={handleCloseModal}>
          <IngredientDetails ingredientData={selectedIngredient} />
        </Modal>
      )}
    </>
  );
}

IngredientCard.propTypes = {
  ingredient: ingredientType.isRequired,
};

export default IngredientCard;
