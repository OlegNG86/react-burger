import { Outlet } from "react-router";
import styles from "./profile-wrapper-template.module.css";
import React, { FormEvent, useEffect } from "react";
import { getUserData, updateUserData } from "../services/actions/user";
import { useForm } from "../hooks/useForm";
import { TForm } from "../utils/types";
import {
  Button,
  EmailInput,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";
import { clearTokens } from "../utils/persistant-token";
import { useAppDispatch, useAppSelector } from "../hooks/redux";

function ProfileWrapperTemplate() {
  const location = useLocation();
  const handleLogout = () => {
    clearTokens();
    window.location.href = "/login"; // простой способ перенаправления
  };
  return (
    <>
      <div className={styles.wrapper}>
        <menu className={styles.menu}>
          <section className={styles.profile}>
            <nav className={styles.mainmenu}>
              <ul className={styles.lists_mainmenu}>
                <li>
                  <Link
                    to="/profile"
                    className={`${styles.link} ${
                      location.pathname === "/profile" && styles.active
                    }`}
                  >
                    <h2>Профиль</h2>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile/orders"
                    className={`${styles.link} ${
                      location.pathname === "/profile/orders" && styles.active
                    }`}
                  >
                    <h2>История заказов</h2>
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className={styles.link}>
                    <h2>Выход</h2>
                  </button>
                </li>
                {location.pathname === "/profile" ? (
                  <li className={styles.link}>
                    <h5 className={styles.textWrapper}>
                      В этом разделе вы можете изменить свои персональные данные
                    </h5>
                  </li>
                ) : (
                  <li className={styles.link}>
                    <h5 className={styles.textWrapper}>
                      В этом разделе вы можете просмотреть свою историю заказов
                    </h5>
                  </li>
                )}
              </ul>
            </nav>
          </section>
          <Outlet />
        </menu>
      </div>
    </>
  );
}

export default ProfileWrapperTemplate;
