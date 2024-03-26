import React from 'react';
import { Link } from 'react-router-dom';
import styles from './register.module.css';

export function RegisterPage() {
  return (
    <div className={styles.wrapper}>
      <form className={styles.form}>
        <h1 className={styles.heading}>Вход</h1>
        <Link to='/login'>
          Войти
        </Link>
      </form>
    </div>
  );
} 

export default RegisterPage;
