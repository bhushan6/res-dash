import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Dashboard, Login } from "./pages";
import { useEffect } from "react";
import { useUser } from "./contexts";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  const navigate = useNavigate();

  const [user] = useUser();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("login");
    }
  }, [user, navigate]);

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
