import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';
const modalsContainer = document.querySelector('#modals');

const Modal = ({ onOverlayClick, onEscKeydown, children }) => {
    React.useEffect(() => {
        document.addEventListener('keydown', onEscKeydown);
        return () => {
            document.removeEventListener('keydown', onEscKeydown);
        }
    }, []);

    return (
        <div  className={styles.modal}>
            {children}
        </div>
    )
}

Modal.propTypes = {
    title: PropTypes.string.isRequired,
    onOverlayClick: PropTypes.func.isRequired,
    onEscKeydown: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
}

export default Modal;