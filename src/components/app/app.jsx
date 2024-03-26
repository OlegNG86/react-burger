import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import style from "./app.module.css";
import AppHeader from "../app-header/app-header";
import HomePage from '../pages/home';
import LoginPage from "../pages/login";

const App = () => {

  return (
    <>
      <AppHeader />
      <main className={style.content}>
        <Router>
          <Routes>
              <Route path="/login" element={<LoginPage />}/>
          </Routes>
        </Router>
      </main>
    </>
  );
};

export default App;
