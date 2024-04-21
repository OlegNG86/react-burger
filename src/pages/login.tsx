import React, { ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import styles from "./login.module.css";
import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { tryAuthorization } from "../services/actions/authorization";
import { useAppDispatch } from "../hooks/redux";

export function LoginPage() {
  const dispatch = useAppDispatch();

  const [valueEmailInput, setValueEmailInput] = React.useState(
    "pykhalov.oleg@gmail.com"
  );
  const [valuePasswordInput, setValuePasswordInput] =
    React.useState("password");

  const handlerSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //@ts-ignore
    dispatch(tryAuthorization(valueEmailInput, valuePasswordInput));
  };

  const onChangeEmailInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValueEmailInput(e.target.value);
  };

  const onChangePasswordInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValuePasswordInput(e.target.value);
  };
  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handlerSubmit}>
        <section className={styles.fields}>
          <h1 className={styles.heading}>Вход</h1>
          <EmailInput
            onChange={onChangeEmailInput}
            value={valueEmailInput}
            name="email"
            isIcon={false}
          />
          <PasswordInput
            onChange={onChangePasswordInput}
            value={valuePasswordInput}
            name="password"
            extraClass="mb-2"
          />
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            extraClass="ml-2"
          >
            Войти
          </Button>
          <div className={styles.enter}>
            Вы - новый пользователь?{" "}
            <Link className={styles.linkEnter} to="/register">
              Зарегистрироваться
            </Link>
          </div>
          <div className={styles.enter}>
            Забыли пароль?{" "}
            <Link className={styles.linkEnter} to="/forgot-password">
              Восстановить пароль
            </Link>
          </div>
        </section>
      </form>
    </div>
  );
}

export default LoginPage;
