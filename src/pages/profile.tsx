import { FormEvent, useEffect } from "react";
import { getUserData, updateUserData } from "../services/actions/user";
import { useForm } from "../hooks/useForm";
import { TForm } from "../utils/types";
import {
  Button,
  EmailInput,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile.module.css";
import { useAppDispatch, useAppSelector } from "../hooks/redux";

function ProfilePage() {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.user.userData);
  const isLoading = useAppSelector((state) => state.user.isLoading);
  const error = useAppSelector((state) => state.user.error);

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  // Использование useForm для управления состоянием формы
  // const { values, handleChange, setValues } = useForm(userData || {});
  const { setValues, handleChange, ...all } = useForm(userData || {});
  const values = all.values as TForm;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateUserData(values));
  };
  const handleCancel = () => {
    setValues(userData || {}); // Восстанавливаем исходные данные пользователя из Redux store
  };

  // Обновление значений формы при изменении данных пользователя
  useEffect(() => {
    setValues(userData || {});
  }, [userData, setValues]);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      
      <section className={styles.profile_fields}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={handleChange}
          value={values.name || ""}
          name={"name"}
          disabled={isLoading}
          onPointerEnterCapture
          onPointerLeaveCapture
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
  );
}

export default ProfilePage;
