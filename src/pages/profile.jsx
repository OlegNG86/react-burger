import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, updateUserData } from "../services/actions/user";
import { useForm } from "../hooks/useForm";
import {
  Button,
  EmailInput,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";
import styles from "./profile.module.css";
import { clearTokens } from "../utils/persistant-token";

function ProfilePage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const isLoading = useSelector((state) => state.user.isLoading);
  const error = useSelector((state) => state.user.error);

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  // Использование useForm для управления состоянием формы
  const { values, handleChange, setValues } = useForm(userData || {});

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserData(values));
  };
  const handleCancel = () => {
    setValues(userData || {}); // Восстанавливаем исходные данные пользователя из Redux store
  };
  const handleLogout = () => {
    clearTokens();
    window.location.href = "/login"; // простой способ перенаправления
  };

  // Обновление значений формы при изменении данных пользователя
  useEffect(() => {
    setValues(userData || {});
  }, [userData, setValues]);

  return (
    <div className={styles.wrapper}>
      <menu className={styles.menu}>
        <section className={styles.profile}>
          <nav className={styles.mainmenu}>
            <ul className={styles.lists_mainmenu}>
              <li>
                <Link
                  to="/profile"
                  className={`${styles.link} ${location.pathname === "/profile" && styles.active}`}
                >
                  <h2>Профиль</h2>
                </Link>
              </li>
              <li>
                <Link
                  to="/profile/orders"
                  className={`${styles.link} ${location.pathname === "/profile/orders" && styles.active}`}
                >
                  <h2>История заказов</h2>
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className={styles.link}>
                  <h2>Выход</h2>
                </button>
              </li>
              <li className={styles.link}>
                <h5>
                  В этом разделе вы можете изменить свои персональные данные
                </h5>
              </li>
            </ul>
          </nav>
        </section>
        <form className={styles.form} onSubmit={handleSubmit}>
          <section className={styles.profile_fields}>
            <Input
              type={"text"}
              placeholder={"Имя"}
              onChange={handleChange}
              value={values.name || ""}
              name={"name"}
              disabled={isLoading}
            />
            <EmailInput
              onChange={handleChange}
              value={values.email || ""}
              name={"email"}
              disabled={isLoading}
            />
            <PasswordInput
              onChange={handleChange}
              value={values.password || ""}
              name={"password"}
              disabled={isLoading}
            />
            {isLoading ? (
              <div>Загрузка...</div>
            ) : (
              <div className={styles.buttonContainer}>
                <Button type="primary" size="medium" htmlType="submit">
                  Сохранить
                </Button>
                <Button
                  type="secondary"
                  size="medium"
                  htmlType="button"
                  onClick={handleCancel}
                >
                  Отмена
                </Button>
              </div>
            )}
            {error && <div className={styles.error}>{error}</div>}
          </section>
        </form>
      </menu>
    </div>
  );
}

export default ProfilePage;
