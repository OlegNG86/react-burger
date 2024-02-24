import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './ingredient-card.module.css';

function IngredientCard({ cardData }) {

  return (
      <li key={cardData._id} className={`${styles.card}`}>
          <Counter count={0} size="default" />
          <img src={cardData.image} alt={cardData.name} className={`mb-1 ${styles.card__image}`}></img>
          <div className={`mb-1 ${styles.card__price}`}>
              <p className={`mr-2`}>{cardData.price}</p>
              <CurrencyIcon type="primary" />
          </div>
          <p className={`text text_type_main-small ${styles.card__name}`}>{cardData.name}</p>
      </li>
  )
};

export default IngredientCard;