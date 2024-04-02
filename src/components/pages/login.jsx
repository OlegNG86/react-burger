import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./login.module.css";
import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { tryAuthorization } from "../../services/actions/authorization";

export function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.authorization.auth);

  const [valueEmailInput, setValueEmailInput] = React.useState(
    "pykhalov.oleg@gmail.com"
  );
  const [valuePasswordInput, setValuePasswordInput] =
    React.useState("password");

  const handlerSubmit = async (event) => {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(event.target));
    dispatch(tryAuthorization(formData.email, formData.password));
  };

  const onChangeEmailInput = (e) => {
    setValueEmailInput(e.target.value);
  };

  const onChangePasswordInput = (e) => {
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
