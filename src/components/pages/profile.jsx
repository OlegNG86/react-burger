import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./profile.module.css";
import iconDone from "../../images/icon-done.png";
import { useDispatch, useSelector } from "react-redux";
import { setOrderId, setError } from "../../services/actions/order-details";
import {
  Button,
  PasswordInput,
  Input,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

function ProfilePage() {
  const [valueInput, setValueInput] = React.useState("value");
  const inputRef = React.useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
  };
  const [valueEmailInput, setValueEmailInput] =
    React.useState("bob@example.com");
  const onChange = (e) => {
    setValueEmailInput(e.target.value);
  };
  const [valuePasswordInput, setValuePasswordInput] =
    React.useState("password");
  const onChangePasswordInput = (e) => {
    setValuePasswordInput(e.target.value);
  };
  return (
    <div className={styles.wrapper}>
      <menu className={styles.menu}>
        <section className={styles.profile}>
          <nav className={styles.mainmenu}>
            <ul className={styles.lists_mainmenu}>
              <li className={styles.list_item_mainmenu}>
                <h2 className={styles.heading_menu}>Профиль</h2>
              </li>
              <li className={styles.list_item_mainmenu}>
                <h2 className={styles.heading_menu}>История заказов</h2>
              </li>
              <li className={styles.list_item_mainmenu}>
                <h2 className={styles.heading_menu}>Выход</h2>
              </li>
              <li>
                <p>
                  В этом разделе вы можете изменить свои персональные данные
                </p>
              </li>
            </ul>
          </nav>
        </section>
        <form className={styles.form}>
          <section className={styles.profile_fields}>
            <Input
              type={"text"}
              placeholder={"Имя"}
              onChange={onChange}
              value={valueInput}
              name={"name"}
              error={false}
              ref={inputRef}
              onIconClick={onIconClick}
              errorText={"Ошибка"}
              size={"default"}
              extraClass="ml-1"
              disabled={true}
              icon={"EditIcon"}
            />
            <EmailInput
              onChange={onChange}
              value={valueEmailInput}
              name={"email"}
              isIcon={true}
            />
            <PasswordInput
              onChange={onChange}
              value={valuePasswordInput}
              name={"password"}
              extraClass="mb-2"
              icon={"EditIcon"}
            />
          </section>
        </form>
      </menu>
    </div>
  );
}

export default ProfilePage;
