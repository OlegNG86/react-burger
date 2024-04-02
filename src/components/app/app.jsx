import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";
import React, { useCallback } from "react";
import style from "./app.module.css";
import AppHeader from "../app-header/app-header";
import HomePage from "../pages/home";
import LoginPage from "../pages/login";
import RegisterPage from "../pages/register";
import ForgotPasswordPage from "../pages/forgot-password";
import ResetPasswordPage from "../pages/reset-password";
import ProtectedRoute from "../protected-route/protected-route";
import ProfilePage from "../pages/profile";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserData,
  setReadyState,
} from "../../services/actions/authorization";
import { getTokens } from "../../utils/persistant-token";
import NotFoundPage from "../pages/not-found";
import IngredientPage from "../pages/ingredient";
import { getIngredients } from "../../services/actions/burger-ingredients";
import Modal from "../modal/modal";

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const isReady = useSelector((state) => state.authorization.isReady);

  const navigate = useNavigate();
  const handlerCloseModal = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  React.useEffect(() => {
    dispatch(getIngredients());
    dispatch(fetchUserData());
  }, []);
  if (!isReady) {
    return <div>Идёт загрузка...</div>;
  }
  return (
    <>
      <main className={style.content}>
        <AppHeader />
        <Routes location={location.state?.backgroundLocation || location}>
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
              <ProtectedRoute anonymous={true}>
                <ResetPasswordPage />
              </ProtectedRoute>
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

        {location.state?.backgroundLocation && (
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
