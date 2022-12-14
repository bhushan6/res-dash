import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Bookmarks, Dashboard, Home, Login } from "./pages";
import { useEffect } from "react";
import { ProtectedRoute, Snackbar } from "./components";
import { TableDataContext, Task } from "./pages/MultiSelect";

const Redirect = () => {
  const navigate = useNavigate();

  navigate("login");

  return <></>;
};

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("login");
  }, []);

  return (
    <div className="App">
      {/* <Routes>
        <Route path="/" element={<Redirect />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="home" element={<Home />} />
          <Route path="bookmark" element={<Bookmarks />} />
        </Route>
      </Routes>
      <Snackbar /> */}
      <Task />
    </div>
  );
}

export default App;
