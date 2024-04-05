import React from "react";
import { Link } from "react-router-dom";
import styles from "./not-found.module.css";

function NotFoundPage() {
  return (
    <div className={styles.error}>
      <h2 className={`text text_type_main-large ${styles.error__title}`}>
        404 - Страница не найдена
      </h2>
      <p className={`text text_type_main-medium ${styles.error__description}`}>
        Извините, такой страницы не существует.  
      </p>
      <Link to="/" className={`text text_type_main-default ${styles.error__link}`}>
        На домашнюю страницу
      </Link>
    </div>
  );
}

export default NotFoundPage;