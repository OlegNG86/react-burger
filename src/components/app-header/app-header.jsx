import React from "react";
import PropTypes from "prop-types";
import {
  Logo,
  BurgerIcon,
  MenuIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";

function Button(props) {
  return (
    <nav className={styles.button}>
      <div className={styles.div}>{props.icon}</div>
      <p
        className={"text text_type_main-default"}
        style={{ color: props.color }}
      >
        {props.children}
      </p>
    </nav>
  );
}

Button.propTypes = {
  icon: PropTypes.element.isRequired,
  color: PropTypes.string,
  children: PropTypes.string.isRequired,
};

function AppHeader() {
  return (
    <header>
      <nav className={styles.navigator}>
        <div>
          <Button icon={<BurgerIcon type="primary" />}>Конструктор</Button>
        </div>
        <div>
          <Button icon={<MenuIcon type="secondary" />} color="darkgrey">
            Лента заказов
          </Button>
        </div>
        <div>
          <Logo />
        </div>
        <div></div>
        <div>
          <Button icon={<ProfileIcon type="secondary" />} color="darkgrey">
            Личный кабинет
          </Button>
        </div>
      </nav>
    </header>
  );
}

export default AppHeader;
