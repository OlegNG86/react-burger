import styles from './ingredient-details.module.css';
import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/types';

function IngredientDetails({ title, ingredientData }) {
    const { image_large, name, calories, carbohydrates, fat, proteins } = ingredientData;

    return (
        <div className={`pl-10 pr-10 ${styles.ingredient}`}>
            <div className={`mt-10 ${styles.ingredient__header}`}>
                <h2 className={`text text_type_main-large ${styles.ingredient__title}`}>{title}</h2>
            </div>
            <img className={`mt-15 mb-15 ${styles.ingredient__image}`} src={image_large} alt={name} />
            <p className={`text text_type_main-medium mt-4 mb-8 ${styles.ingredient__name}`}>{name}</p>
            <ul className={`text text_type_main-default mb-15 ${styles.ingredient__listItem}`}>
                <li className={`text text_type_main-default ${styles.ingredient__item}`}>
                    <p className={`text text_type_main-default ${styles.ingredient__itemText}`}>Калории,ккал</p>
                    <p className={`${styles.ingredient__itemValue}`}>{calories}</p>
                </li>
                <li className={`text text_type_main-default ${styles.ingredient__item}`}>
                    <p className={`text text_type_main-default ${styles.ingredient__itemText}`}>Белки, г</p>
                    <p className={`${styles.ingredient__itemValue}`}>{carbohydrates}</p>
                </li>
                <li className={`text text_type_main-default ${styles.ingredient__item}`}>
                    <p className={`text text_type_main-default ${styles.ingredient__itemText}`}>Жиры, г</p>
                    <p className={`${styles.ingredient__itemValue}`}>{fat}</p>
                </li>
                <li className={`text text_type_main-default ${styles.ingredient__item}`}>
                    <p className={`text text_type_main-default ${styles.ingredient__itemText}`}>Углеводы, г</p>
                    <p className={`${styles.ingredient__itemValue}`}>{proteins}</p>
                </li>
            </ul>
        </div>
    )
}

IngredientDetails.propTypes = {
    ingredientData: ingredientType,
    title: PropTypes.string.isRequired,
  }

export default IngredientDetails;