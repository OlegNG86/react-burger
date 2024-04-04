import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./register.module.css";
import {
  Button,
  Input,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { tryRegistration } from "../services/actions/authorization";
import { useDispatch, useSelector } from "react-redux";

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.authorization.auth);
  
  const [valueInput, setValueInput] = React.useState("Oleg");
  const inputRef = React.useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };
  const [valueEmailInput, setValueEmailInput] =
    React.useState("pykhalov.oleg@gmail.com");
  const onChange = (e) => {
    setValueEmailInput(e.target.value);
  };
  const [valuePasswordInput, setValuePasswordInput] =
    React.useState("password");
  const onChangePasswordInput = (e) => {
    setValuePasswordInput(e.target.value);
  };
  const handlerSubmit = async (event) => {
    event.preventDefault();
    dispatch(tryRegistration(valueEmailInput, valuePasswordInput, valueInput));
  };
  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handlerSubmit}>
        <section className={styles.fields}>
          <h1 className={styles.heading}>Регистрация</h1>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={(e) => setValueInput(e.target.value)}
            icon={"CurrencyIcon"}
            value={valueInput}
            name={"name"}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="ml-1"
          />
          <EmailInput
            onChange={onChange}
            value={valueEmailInput}
            name={"email"}
            isIcon={false}
          />
          <PasswordInput
            onChange={onChangePasswordInput}
            value={valuePasswordInput}
            name={"password"}
            extraClass="mb-2"
          />

            <Button
              htmlType="submit"
              type="primary"
              size="medium"
              extraClass="ml-2"
            >
              Зарегистрироваться
            </Button>

          <div className={styles.enter}>
            Уже зарегистрированы?
            <Link className={styles.linkEnter} to="/login">
              Войти
            </Link>
          </div>
        </section>
      </form>
    </div>
  );
}

export default RegisterPage;
