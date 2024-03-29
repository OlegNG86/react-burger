import React from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
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
import { clearTokens } from "../../utils/persistant-token";

function ProfilePage() {
  const location = useLocation();

  const [valueInput, setValueInput] = React.useState("value");
  const inputRef = React.useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
  };
  const [valueEmailInput, setValueEmailInput] = React.useState("bob@example.com");
  const onChange = (e) => {
    setValueEmailInput(e.target.value);
  };
  const [valuePasswordInput, setValuePasswordInput] = React.useState("password");
  const onChangePasswordInput = (e) => {
    setValuePasswordInput(e.target.value);
  };

  const handleLogout = () => {
    clearTokens();
    window.location.href = "/login"; // простой способ перенаправления
  };

  return (
    <div className={styles.wrapper}>
      <menu className={styles.menu}>
        <section className={styles.profile}>
          <nav className={styles.mainmenu}>
            <ul className={styles.lists_mainmenu}>
              <li className={styles.list_item_mainmenu}>
                <Link to="/profile" className={`${styles.link} ${location.pathname === "/profile" && styles.active}`}>
                  <h2>Профиль</h2>
                </Link>
              </li>
              <li className={styles.list_item_mainmenu}>
                <Link to="/profile/orders" className={`${styles.link} ${location.pathname === "/profile/orders" && styles.active}`}>
                  <h2>История заказов</h2>
                </Link>
              </li>
              <li className={styles.list_item_mainmenu}>
                <button onClick={handleLogout} className={styles.link}>
                  <h2>Выход</h2>
                </button>
              </li>
              <li>
                <p className={styles.link}>
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
