import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styles from "./modal.module.css";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import {
  Button,
  CloseIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const Modal = ({ title, onClose, children }: {title?: string, onClose: any, children: any}) => {
  React.useEffect(() => {
    const handleEscKeydown = (e: any) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscKeydown);
    return () => {
      document.removeEventListener("keydown", handleEscKeydown);
    };
  }, [onClose]);

  const modalTitle = title ? title : "";

  return ReactDOM.createPortal(
    <>
      <div className={styles.modal}>
        <div className={`mt-10 ${styles.header}`}>
          <h2 className={`text text_type_main-large ${styles.title}`}>
            {modalTitle}
          </h2>
        </div>
        <Button
          onClick={onClose}
          htmlType="button"
          className={styles.closeButton}
        >
          <CloseIcon type={"primary"} />
        </Button>

        {children}
      </div>
      <ModalOverlay onClick={onClose} />
    </>,
    //@ts-ignore
    document.getElementById("modals")
  );
};

export default Modal;
