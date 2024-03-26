import React from 'react';
import { Link } from 'react-router-dom';
import styles from './forgot-password.module.css';

export function ForgotPasswordPage() {
  return (
    <div className={styles.wrapper}>
      <form className={styles.form}>
        <h1 className={styles.heading}>Вход</h1>
        <Link to='/reset-password'>
          Восстановить
        </Link>
        <Link to='/login'>
          Войти
        </Link>
      </form>
    </div>
  );
} 

export default ForgotPasswordPage;
