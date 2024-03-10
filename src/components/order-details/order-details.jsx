import PropTypes from 'prop-types';
import styles from './order-details.module.css';
import iconDone from '../../images/icon-done.svg';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, closeModal } from '../../services/actions/modal';
import Modal from '../modal/modal';

function OrderDetails({ orderId }) {
    const dispatch = useDispatch();
    const { isModalOpen } = useSelector(store => store.modal);

    function handleOpenModal() {
        dispatch(openModal());
    }

    function handleCloseModal() {
        dispatch(closeModal());
    }
    return (
        <>
            <div className={styles.order}>
                <h2 className={`text text_type_digits-large mt-30 mb-8 ${styles.order__title}`}>{orderId}</h2>
                <p className={`text text_type_main-medium ${styles.order__id}`}>Идентификатор заказа</p>
                <img className={`mt-15 mb-15 ${styles.order__image}`} src={iconDone} alt='Ваш заказ принят' />
                <p className={`text text_type_main-default ${styles.order__description}`}>Ваш заказ начали готовить</p>
                <p className={`text text_type_main-default mt-2 mb-30 ${styles.order__descriptionReady}`}>Дождитесь готовности на орбитальной станции</p>
            </div>
        </>
    )
}

OrderDetails.propTypes = {
    orderId: PropTypes.string.isRequired,
}

export default OrderDetails;