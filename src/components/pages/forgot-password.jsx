import React from 'react';
import { Link } from 'react-router-dom';
import styles from './forgot-password.module.css';
import {
  Button,
  Input,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

export function ForgotPasswordPage() {
  const [valueEmailInput, setValueEmailInput] = React.useState('bob@example.com')
  const onChange = e => {
    setValueEmailInput(e.target.value)
  }
  return (
    <div className={styles.wrapper}>
      <form className={styles.form}>
      <section className={styles.fields}>
      <h1 className={styles.heading}>Вход</h1>
      <EmailInput
        onChange={onChange}
        value={valueEmailInput}
        name={'email'}
        isIcon={false}
      />
      <Link to='/'>
        <Button htmlType="button" type="primary" size="medium" extraClass="ml-2">
          Восстановить
        </Button>
      </Link>
      <div  className={styles.enter} >
        Вспомнили пароль? 
      <Link to='/reset-password'>
        Войти
      </Link> 
     </div>
      </section>
      </form>
    </div>
    
  );
} 

export default ForgotPasswordPage;
