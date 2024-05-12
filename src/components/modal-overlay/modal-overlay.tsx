import styles from "./modal-overlay.module.css";

export const ModalOverlay = ({ onClick }: { onClick: React.MouseEventHandler<HTMLDivElement> }) => {
  return <div className={styles.overlay} onClick={onClick} />;
};
