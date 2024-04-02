import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./forgot-password.module.css";
import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { resetPasswordRequest } from "../../services/actions/authorization";

export function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [valueEmailInput, setValueEmailInput] = React.useState(
    "pykhalov.oleg@gmail.com"
  );
  const resetPasswordSuccess = useSelector(
    (state) => state.authorization.resetPasswordSuccess
  );

  const onChange = (e) => {
    setValueEmailInput(e.target.value);
  };

  const handlerSubmit = async (event) => {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(event.target));
    await dispatch(resetPasswordRequest(formData.email));
    navigate("/reset-password")
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
              onSubmit={handlerSubmit}
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
