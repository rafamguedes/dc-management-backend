import { Route, Routes, Navigate } from 'react-router';
import { Dashboard } from '../pages/Dashboard/Dashboard';
import { Login } from '../pages/Login/Login';
import { Layout } from '../components/Layout/Layout';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" />;
};

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/" element={ <Layout /> }>
        <Route path="/dashboard" element={ <PrivateRoute> <Dashboard /> </PrivateRoute> } />
      </Route>
    </Routes>
  );
}