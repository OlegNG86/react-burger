import React from "react";
import PropTypes from "prop-types";
import {
  Logo,
  BurgerIcon,
  MenuIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import { NavLink, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";

function Button({
  to,
  icon: Icon,
  text,
  isActive,
}: {
  to: string;
  icon: any;
  text: string;
  isActive: boolean;
}) {
  return (
    <NavLink to={to}>
      {isActive ? (
        <>
          <nav className={styles.button}>
            <div className={styles.div}>{<Icon type={"primary"} />}</div>
            <p
              className={"text text_type_main-default"}
              style={{ color: "white" }}
            >
              {text}
            </p>
          </nav>
        </>
      ) : (
        <>
          <nav className={styles.button}>
            <div className={styles.div}>{<Icon type={"secondary"} />}</div>
            <p
              className={"text text_type_main-default"}
              style={{ color: "darkgrey" }}
            >
              {text}
            </p>
          </nav>
        </>
      )}
    </NavLink>
  );
}

function AppHeader() {
  const isAuthenticated = useAppSelector((state) => state.authorization.auth);
  const name = useAppSelector((state: any) => state.authorization.profile.name);
  const nameField = isAuthenticated ? name : "Личный кабинет";

  const location = useLocation();

  const homeActive = location.pathname === "/";
  const feedActive = location.pathname.includes("/feed");
  const profileActive = location.pathname.includes("/profile");
  return (
    <header>
      <nav className={styles.navigator}>
        <div>
          <Button
            to={"/"}
            icon={BurgerIcon}
            text="Конструктор"
            isActive={homeActive}
          />
        </div>
        <div>
          <Button
            to={"/feed"}
            icon={MenuIcon}
            text="Лента заказов"
            isActive={feedActive}
          />
        </div>
        <div>
          <NavLink to="/">
            <Logo />
          </NavLink>
        </div>
        <div></div>
        <div>
          <Button
            to={"/profile"}
            icon={ProfileIcon}
            text={nameField}
            isActive={profileActive}
          />
        </div>
      </nav>
    </header>
  );
}

export default AppHeader;
