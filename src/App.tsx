import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { initializeAuth0 } from "./services/authService";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";
import RedirectRoute from "./routes/RedirectRoute";
import { navPaths } from "./utils/nav";

const App = () => {
  return initializeAuth0({
    children: (
      <AuthProvider>
        <Router>
          <Routes>
            <Route
              path={navPaths.home}
              element={
                <RedirectRoute>
                  <Home />
                </RedirectRoute>
              }
            />
            <Route
              path={navPaths.dashboard}
              element={<PrivateRoute element={<Dashboard />} />}
            />
          </Routes>
        </Router>
      </AuthProvider>
    ),
  });
};

export default App;
