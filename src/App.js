import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { isAuthenticated } from "./utils/auth";

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      {/* todo: remove this div and place it on each screen */}
      <div className="min-h-screen bg-gradient-to-b from-blue-950 via-purple-800 to-gray-950 text-white">
        <Routes>
          <Route
            path="/login"
            element={isAuthenticated() ? <Navigate to="/app" /> : <Login />}
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
            element={<Navigate to={isAuthenticated() ? "/app" : "/login"} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
