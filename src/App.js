import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { isAuthenticated } from "./utils/auth";

const ProtectedRoute = ({ children }) => {
  const [authStatus, setAuthStatus] = useState(null); // Store authentication status

  useEffect(() => {
    const status = isAuthenticated();
    setAuthStatus(status); // Set authentication status once
  }, []);

  // Avoid rendering until auth status is determined
  if (authStatus === null) return <div>Loading...</div>;

  return authStatus ? children : <Navigate to="/login" replace />;
};

function App() {
  const [isAuth, setIsAuth] = useState(null); // Cache authentication status

  useEffect(() => {
    const status = isAuthenticated();
    setIsAuth(status);
  }, []);

  if (isAuth === null) return <div>Loading...</div>; // Avoid rendering routes prematurely

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
