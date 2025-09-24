import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import FarmInput from './pages/FarmInput.jsx';
import CropRecommendations from './pages/CropRecommendations.jsx';
import PestDiagnosis from './pages/PestDiagnosis.jsx';
import Market from './pages/Market.jsx';
import Profile from './pages/Profile.jsx';
import NotFound from './pages/NotFound.jsx';
import { useAuth } from './context/AuthContext.jsx';

function Protected({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <Protected>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </Protected>
        }
      />
      <Route
        path="/farm/input"
        element={
          <Protected>
            <MainLayout>
              <FarmInput />
            </MainLayout>
          </Protected>
        }
      />
      <Route
        path="/recommendations"
        element={
          <Protected>
            <MainLayout>
              <CropRecommendations />
            </MainLayout>
          </Protected>
        }
      />
      <Route
        path="/pest-scan"
        element={
          <Protected>
            <MainLayout>
              <PestDiagnosis />
            </MainLayout>
          </Protected>
        }
      />
      <Route
        path="/market"
        element={
          <Protected>
            <MainLayout>
              <Market />
            </MainLayout>
          </Protected>
        }
      />
      <Route
        path="/profile"
        element={
          <Protected>
            <MainLayout>
              <Profile />
            </MainLayout>
          </Protected>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
