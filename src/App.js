import "./App.css";
import { Routes, Route } from "react-router-dom";

// Компоненти
// Public Pages
// import WelcomePage from "./pages/WelcomePage/WelcomePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LogInPage from "./pages/LogInPage/LogInPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import TablePage from "./pages/TablePage/TablePage";

// Private Pages
import SharedLayout from "./pages/SharedLayout/SharedLayout";
import CabinetPage from "./pages/CabinetPage/CabinetPage";
import AddItemPage from "./pages/AddItemPage/AddItemPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<TablePage />} />
          {/* <Route index element={<WelcomePage />} /> */}
          <Route path="registration" element={<RegisterPage />} />
          <Route path="login" element={<LogInPage />} />
          <Route path="cabinet" element={<CabinetPage />} />
          <Route path="add" element={<AddItemPage />} />
          <Route path="build" element={<p> Building Classifier</p>} />
          <Route path="user" element={<p> User Materials</p>} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
