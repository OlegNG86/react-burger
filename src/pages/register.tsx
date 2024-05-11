import React, { ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import styles from "./register.module.css";
import {
  Button,
  Input,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { tryRegistration } from "../services/actions/authorization";
import { useAppDispatch } from "../hooks/redux";

function RegisterPage() {
  const dispatch = useAppDispatch();

  const [valueInput, setValueInput] = React.useState("Oleg");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const onIconClick = () => {
    setTimeout(() => {
      if (inputRef.current !== null) {
        inputRef.current.focus();
      }
    }, 0);
    alert("Icon Click Callback");
  };
  const [valueEmailInput, setValueEmailInput] = React.useState(
    "pykhalov.oleg@gmail.com"
  );
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValueEmailInput(e.target.value);
  };
  const [valuePasswordInput, setValuePasswordInput] =
    React.useState("password");
  const onChangePasswordInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValuePasswordInput(e.target.value);
  };
  const handlerSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
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
