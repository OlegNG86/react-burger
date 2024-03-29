import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import React from "react";
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
import { fetchUserData } from "../../services/actions/authorization";
import { getTokens } from "../../utils/persistant-token";
import NotFoundPage from "../pages/not-found";
import IngredientPage from "../pages/ingredient";

const App = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const accessToken = getTokens().accessToken;
    if (accessToken) {
      dispatch(fetchUserData());
    }
  }, [dispatch]);
  return (
    <>
      <main className={style.content}>
        <Router>
          <AppHeader />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
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
            <Route
              path="/ingredients/:id"
              element={
                <ProtectedRoute>
                  <IngredientPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </main>
    </>
  );
};

export default App;
