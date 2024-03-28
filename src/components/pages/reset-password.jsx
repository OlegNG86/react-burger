import React from "react";
import { Link } from "react-router-dom";
import styles from "./register.module.css";
import {
  Button,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

function ResetPasswordPage() {
  const [valueInput, setValueInput] = React.useState("");
  const inputRef = React.useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };
  const [valuePasswordInput, setValuePasswordInput] = React.useState("");
  const onChangePasswordInput = (e) => {
    setValuePasswordInput(e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form}>
        <section className={styles.fields}>
          <h1 className={styles.heading}>Восстановление пароля</h1>
          <PasswordInput
            onChange={onChangePasswordInput}
            value={valuePasswordInput}
            name={"pasword"}
            placeholder={"Введите новый пароль"}
            extraClass="mb-2"
          ></PasswordInput>
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            onChange={(e) => setValueInput(e.target.value)}
            value={valueInput}
            name={"name"}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="ml-1"
          />

          <Button
            htmlType="button"
            type="primary"
            size="medium"
            extraClass="ml-2"
          >
            Сохранить
          </Button>

          <div className={styles.enter}>
            Вспомнили пароль?
            <Link className={styles.linkEnter} to="/login">
              Войти
            </Link>
          </div>
        </section>
      </form>
    </div>
  );
}

export default ResetPasswordPage;
