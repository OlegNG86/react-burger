import {
  Routes,
  Route,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";
import React, { useCallback } from "react";
import style from "./app.module.css";
import AppHeader from "../app-header/app-header";
import HomePage from "../../pages/home";
import LoginPage from "../../pages/login";
import RegisterPage from "../../pages/register";
import ForgotPasswordPage from "../../pages/forgot-password";
import ResetPasswordPage from "../../pages/reset-password";
import ProtectedRoute from "../protected-route/protected-route";
import ProfilePage from "../../pages/profile";
import { fetchUserData } from "../../utils/common";
import NotFoundPage from "../../pages/not-found";
import IngredientPage from "../../pages/ingredient";
import { getIngredients } from "../../services/actions/burger-ingredients";
import Modal from "../modal/modal";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";

const App = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isReady = useAppSelector((state) => state.authorization.isReady);

  const navigate = useNavigate();
  const handlerCloseModal = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const wasOnForgotPassword: string | null =
    localStorage.getItem("forgotPasswordVisited") || null;

  React.useEffect(() => {
    dispatch(getIngredients());
    dispatch(fetchUserData());
  }, [dispatch]);
  if (!isReady) {
    return <div>Идёт загрузка...</div>;
  }
  return (
    <>
      <AppHeader />
      <main className={style.content}>
        <Routes
          location={(location?.state?.backgroundLocation || location) as any}
        >
          <Route path="/ingredient/:id" element={<IngredientPage />} />
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={
              <ProtectedRoute anonymous={true}>
                <LoginPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRoute anonymous={true}>
                <RegisterPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <ProtectedRoute anonymous={true}>
                <ForgotPasswordPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reset-password"
            element={
              wasOnForgotPassword ? (
                <ProtectedRoute anonymous={true}>
                  <ResetPasswordPage />
                </ProtectedRoute>
              ) : (
                <Navigate to="/forgot-password" />
              )
            }
          />
          <Route
            path="/profile/*"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          >
            <Route path="orders" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        {location?.state?.backgroundLocation && (
          <Routes>
            <Route
              path="/ingredient/:id"
              element={
                <Modal onClose={handlerCloseModal} title="Ингредиент">
                  <IngredientPage />
                </Modal>
              }
            />
          </Routes>
        )}
      </main>
    </>
  );
};

export default App;
