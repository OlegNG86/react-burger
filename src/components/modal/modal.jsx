import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal.module.css';
import {ModalOverlay} from '../modal-overlay/modal-overlay';

const modalsContainer = document.getElementById('modals');

const Modal = ({ onOverlayClick, onEscKeydown, children }) => {
    React.useEffect(() => {
        document.addEventListener('keydown', onEscKeydown);
        return () => {
            document.removeEventListener('keydown', onEscKeydown);
        }
    }, []);

    return ReactDOM.createPortal(
        <>
            <div className={styles.modal}>
                {children}
            </div>
            <ModalOverlay onClick={onOverlayClick} />
        </>,
        modalsContainer
    )
}

Modal.propTypes = {
    title: PropTypes.string.isRequired,
    onOverlayClick: PropTypes.func.isRequired,
    onEscKeydown: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
}

export default Modal;