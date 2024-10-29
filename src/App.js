import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { isAuthenticated } from "./utils/auth";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const auth = isAuthenticated();
    setIsAuth(auth);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={isAuth ? <Navigate to="/app" /> : <Login />}
        />
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={<Navigate to={isAuth ? "/app" : "/login"} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
