import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";

export default function ProtectedRoute({
  children,
  anonymous = false,
}: {
  children: JSX.Element;
  anonymous?: boolean;
}): JSX.Element {
  const isLoggedIn = useAppSelector((store) => store.authorization.auth);

  const location = useLocation();
  const from = location.state?.from || "/";
  // Если разрешен неавторизованный доступ, а пользователь авторизован...
  if (anonymous && isLoggedIn) {
    // ...то отправляем его на предыдущую страницу
    return <Navigate to={from} />;
  }

  // Если требуется авторизация, а пользователь не авторизован...
  if (!anonymous && !isLoggedIn) {
    // ...то отправляем его на страницу логин
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // Если все ок, то рендерим внутреннее содержимое
  return children;
}
