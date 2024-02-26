import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal.module.css';
import { ModalOverlay } from '../modal-overlay/modal-overlay';

const Modal = ({ onClose, children }) => {
    const handleEscKeydown = (e) => {
        if (e.key === 'Escape') {
            onClose();
        }
    };

    React.useEffect(() => {
        document.addEventListener('keydown', handleEscKeydown);
        return () => {
            document.removeEventListener('keydown', handleEscKeydown);
        };
    }, [onClose]);

    return ReactDOM.createPortal(
        <>
            <div className={styles.modal}>
                {children}
            </div>
            <ModalOverlay onClick={onClose} />
        </>,
        document.getElementById('modals')
    );
};

Modal.propTypes = {
    title: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
};

export default Modal;