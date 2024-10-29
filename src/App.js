import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { isAuthenticated } from "./utils/auth";

const ProtectedRoute = ({ children }) => {
  const [authStatus, setAuthStatus] = useState(null);

  useEffect(() => {
    const status = isAuthenticated();
    setAuthStatus(status);
  }, []);

  if (authStatus === null) return <div>Loading...</div>;

  return authStatus ? children : <Navigate to="/login" replace />;
};

function App() {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const status = isAuthenticated();
    setIsAuth(status);
  }, []);

  if (isAuth === null) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={isAuth ? <Navigate to="/app" replace /> : <Login />}
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
          element={<Navigate to={isAuth ? "/app" : "/login"} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
