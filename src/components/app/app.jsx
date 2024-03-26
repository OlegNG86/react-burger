import style from "./app.module.css";
import AppHeader from "../app-header/app-header";
import HomePage from '../pages/home';

const App = () => {

  return (
    <>
      <AppHeader />
      <main className={style.content}>
        <HomePage />
      </main>
    </>
  );
};

export default App;
