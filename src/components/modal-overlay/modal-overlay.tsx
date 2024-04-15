import PropTypes from "prop-types";
import styles from "./modal-overlay.module.css";

export const ModalOverlay = ({ onClick }: {onClick: any}) => {
  return <div className={styles.overlay} onClick={onClick} />;
};
