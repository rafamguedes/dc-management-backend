import { Route, Routes, Navigate } from 'react-router';
import { Container } from '@mantine/core';
import { Dashboard } from '../pages/Dashboard/Dashboard';
import { Login } from '../pages/Login/Login';
import { Layout } from '../components/Layout/Layout';
import { UserComponent } from '../components/User/User';
import { ItemsComponent } from '../components/Items/Items';
import Header from '../components/Header/Header';
import useDashboard from '../hooks/userUser';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" />;
};

const UserPage = () => {
  const {
    users,
    loading,
    editingId,
    editedRole,
    handleEdit,
    handleUpdate,
    handleDelete,
    handleFilter,
    setEditedRole,
    handleRefresh,
  } = useDashboard();

  return (
    <>
      <Header />
      <Container size="xl" py="md">
        <UserComponent
          users={users}
          loading={loading}
          editingId={editingId}
          editedRole={editedRole}
          handleEdit={handleEdit}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
          handleFilter={handleFilter}
          setEditedRole={setEditedRole}
          onUserCreated={handleRefresh}
        />
      </Container>
    </>
  );
};

const ItemsPage = () => {
  return (
    <>
      <Header />
      <Container size="xl" py="md">
        <ItemsComponent />
      </Container>
    </>
  );
};

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route element={ <Layout /> }>
        <Route path="/dashboard" element={ <PrivateRoute> <Dashboard /> </PrivateRoute> } />
        <Route path="/dashboard/users" element={ <PrivateRoute> <UserPage /> </PrivateRoute> } />
        <Route path="/dashboard/items" element={ <PrivateRoute> <ItemsPage /> </PrivateRoute> } />
      </Route>
    </Routes>
  );
}