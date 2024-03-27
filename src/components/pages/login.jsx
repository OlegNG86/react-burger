import React from 'react';
import { Link } from 'react-router-dom';
import styles from './login.module.css';
import { request } from "../../utils/connector";
import {
  Button,
  Input,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { tryAuthorization } from '../../services/actions/authorization';

const handlerSubmit = async (event) => {
  event.preventDefault();
  const formData = Object.fromEntries(new FormData(event.target));
  tryAuthorization(formData.email, formData.password);
  console.log(formData.email, formData.password)
}

export function LoginPage() {
  const [valueEmailInput, setValueEmailInput] = React.useState('bob@example.com')
  const onChange = e => {
    setValueEmailInput(e.target.value)
  }
  const [valuePasswordInput, setValuePasswordInput] = React.useState('password')
  const onChangePasswordInput = e => {
    setValuePasswordInput(e.target.value)
  }
  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handlerSubmit}>
      <section className={styles.fields}>
      <h1 className={styles.heading}>Вход</h1>
      <EmailInput
        onChange={onChange}
        value={valueEmailInput}
        name={'email'}
        isIcon={false}
      />
      <PasswordInput
        onChange={onChangePasswordInput}
        value={valuePasswordInput}
        name={'password'}
        extraClass="mb-2"
      />
      <Link to='/'>
        <Button htmlType="submit" type="primary" size="medium" extraClass="ml-2">
          Войти
        </Button>
      </Link>
      <div  className={styles.enter} >
        Вы - новый пользователь? 
      <Link to='/register'>
        Зарегистрироваться
      </Link> 
     </div>
     <div  className={styles.enter} >
        Забыли пароль? 
      <Link to='/forgot-password'>
        Восстановить пароль
      </Link> 
     </div>
      </section>
      </form>
    </div>
    
  );
} 

export default LoginPage;