import React from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import {
  Button,
  CloseIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const Modal = ({
  title,
  onClose,
  children,
}: {
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  React.useEffect(() => {
    const handleEscKeydown = (e: KeyboardEvent) => {
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
      <div className={styles.modal} data-cy="modal">
        <div className={`mt-10 ${styles.header}`}>
          <h2 className={`text text_type_main-large ${styles.title}`}>
            {modalTitle}
          </h2>
        </div>
        <Button
          onClick={onClose}
          htmlType="button"
          className={styles.closeButton}
          data-cy="modal-close-button"
        >
          <CloseIcon type={"primary"} />
        </Button>

        {children}
      </div>
      <ModalOverlay onClick={onClose} />
    </>,
    document.getElementById("modals")!
  );
};

export default Modal;
