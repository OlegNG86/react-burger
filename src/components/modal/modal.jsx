import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal.module.css';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import { Button, CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const Modal = ({ onClose, children }) => {
    React.useEffect(() => {
        const handleEscKeydown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscKeydown);
        return () => {
            document.removeEventListener('keydown', handleEscKeydown);
        };
    }, [onClose]);

    return ReactDOM.createPortal(
        <>
            <div className={styles.modal}>
                <Button 
                    onClick={onClose}
                    htmlType='button' 
                    className={styles.closeButton}
                >
                    <CloseIcon />
                </Button>
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