import React, { ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "./forgot-password.module.css";
import { useAppDispatch } from "../hooks/redux";
import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { resetPasswordRequest } from "../services/actions/authorization";

export function ForgotPasswordPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [valueEmailInput, setValueEmailInput] = React.useState<string>(
    "pykhalov.oleg@gmail.com"
  );

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValueEmailInput(e.target.value);
  };

  const handlerSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(resetPasswordRequest(valueEmailInput));
    localStorage.setItem("forgotPasswordVisited", "true");
    navigate("/reset-password");
  };
  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handlerSubmit}>
        <section className={styles.fields}>
          <h1 className={styles.heading}>Вход</h1>
          <EmailInput
            onChange={onChange}
            value={valueEmailInput}
            name={"email"}
            isIcon={false}
          />

          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            extraClass="ml-2"
          >
            Восстановить
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

export default ForgotPasswordPage;
