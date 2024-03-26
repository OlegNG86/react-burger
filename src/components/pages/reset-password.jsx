import React from 'react';
import { Link } from 'react-router-dom';
import styles from './reset-password.module.css';

export function ResetPasswordPage() {
  return (
    <div className={styles.wrapper}>
      <form className={styles.form}>
        <h1 className={styles.heading}>Вход</h1>
        <Link to='/login'>
          Сохранить
        </Link>
      </form>
    </div>
  );
} 

export default ResetPasswordPage;
