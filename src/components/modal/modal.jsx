import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal.module.css';
import { ModalOverlay } from '../modal-overlay/modal-overlay';

const Modal = ({ onOverlayClick, children }) => {
    const handleEscKeydown = (e) => {
        if (e.key === 'Escape') {
            onOverlayClick();
        }
    };

    React.useEffect(() => {
        document.addEventListener('keydown', handleEscKeydown);
        return () => {
            document.removeEventListener('keydown', handleEscKeydown);
        };
    }, [onOverlayClick]);

    return ReactDOM.createPortal(
        <>
            <div className={styles.modal}>
                {children}
            </div>
            <ModalOverlay onClick={onOverlayClick} />
        </>,
        document.getElementById('modals')
    );
};

Modal.propTypes = {
    title: PropTypes.string.isRequired,
    onOverlayClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
};

export default Modal;