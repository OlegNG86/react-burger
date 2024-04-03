import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./register.module.css";
import {
  Button,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { changePasswordRequest } from "../services/actions/authorization";

function ResetPasswordPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [valueInput, setValueInput] = React.useState("");
  const inputRef = React.useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };
  const changePasswordSuccess = useSelector(
    (state) => state.authorization.changePasswordSuccess
  );
  const [valuePasswordInput, setValuePasswordInput] = React.useState("");
  const onChangePasswordInput = (e) => {
    setValuePasswordInput(e.target.value);
  };
  const handlerSubmit = async (event) => {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(event.target));
    await dispatch(changePasswordRequest(formData.password, formData.token));
    navigate("/");

  };
  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handlerSubmit}>
        <section className={styles.fields}>
          <h1 className={styles.heading}>Восстановление пароля</h1>
          <PasswordInput
            onChange={onChangePasswordInput}
            value={valuePasswordInput}
            name={"password"}
            placeholder={"Введите новый пароль"}
            extraClass="mb-2"
          ></PasswordInput>
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            onChange={(e) => setValueInput(e.target.value)}
            value={valueInput}
            name={"token"}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="ml-1"
          />

          <Button
            onSubmit={handlerSubmit}
            htmlType="submit"
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
