// Ваш компонент App обновляется для использования AuthGuard

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import style from './app.module.css';
import AppHeader from '../app-header/app-header';
import HomePage from '../pages/home';
import LoginPage from '../pages/login';
import RegisterPage from '../pages/register';
import ForgotPasswordPage from '../pages/forgot-password';
import ResetPasswordPage from '../pages/reset-password';
import AuthGuard from '../auth-guard/auth-guard';
import ProfilePage from '../pages/profile';

const App = () => {
  return (
    <>
      <AppHeader />
      <main className={style.content}>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/" element={<AuthGuard><HomePage /></AuthGuard>} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </Router>
      </main>
    </>
  );
};

export default App;
