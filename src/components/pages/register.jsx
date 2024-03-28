import React from 'react';
import { Link } from 'react-router-dom';
import styles from './register.module.css';
import {
  Button,
  Input,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

function RegisterPage() {
  const [valueInput, setValueInput] = React.useState('value')
  const inputRef = React.useRef(null)
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    alert('Icon Click Callback')
  }
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
      <form className={styles.form}>
        <section className={styles.fields}>
        <h1 className={styles.heading}>Регистрация</h1>
        <Input
          type={'text'}
          placeholder={'placeholder'}
          onChange={e => setValueInput(e.target.value)}
          icon={'CurrencyIcon'}
          value={valueInput}
          name={'name'}
          error={false}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="ml-1"
          />
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
        <Link to='/login'>
          <Button htmlType="button" type="primary" size="medium" extraClass="ml-2">
            Зарегистрироваться
          </Button>
        </Link>
        <div  className={styles.enter} >
          Уже зарегистрированы? 
        <Link className={styles.linkEnter} to='/login'>
          Войти
        </Link> 
       </div>
        </section>
      </form>
    </div>
  );
} 

export default RegisterPage;
