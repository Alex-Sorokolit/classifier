import "./App.css";
import { Routes, Route } from "react-router-dom";
// Компоненти
// Public Pages
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LogInPage from "./pages/LogInPage/LogInPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

// Private Pages
import SharedLayout from "./pages/SharedLayout/SharedLayout";
import CabinetPage from "./pages/CabinetPage/CabinetPage";
import AddItemPage from "./pages/AddItemPage/AddItemPage";
import TablePage from "./pages/TablePage/TablePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="welcome" element={<WelcomePage />} />
        <Route path="registration" element={<RegisterPage />} />
        <Route path="login" element={<LogInPage />} />

        <Route path="/" element={<SharedLayout />}>
          <Route path="cabinet" element={<CabinetPage />} />
          <Route path="add" element={<AddItemPage />} />
          <Route path="table" element={<TablePage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
