import React from "react";
import { Route, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children, anonymous = false } : {children: any, anonymous?: boolean}) {
  const isLoggedIn = useSelector((store: any) => store.authorization.auth);

  const location = useLocation();
  const from = location.state?.from || '/';
  // Если разрешен неавторизованный доступ, а пользователь авторизован...
  if (anonymous && isLoggedIn) {
    // ...то отправляем его на предыдущую страницу
    return <Navigate to={ from } />;
  }

  // Если требуется авторизация, а пользователь не авторизован...
  if (!anonymous && !isLoggedIn) {
    // ...то отправляем его на страницу логин
    return <Navigate to="/login" state={{ from: location}}/>;
  }

  // Если все ок, то рендерим внутреннее содержимое
  return children;
}