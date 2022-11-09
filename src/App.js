import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Dashboard, Login } from "./pages";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login");
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
