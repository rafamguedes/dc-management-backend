import NotFoundUser from '../../components/NotFound/NotFound';
import UserTable from '../../components/Table/Table';
import useDashboard from '../../hooks/useDashboard';
import Header from '../../components/Header/Header';
import { SectionTable } from './Style';

export function Dashboard() {
  const {
    users,
    loading,
    editingId,
    editedRole,
    handleEdit,
    handleUpdate,
    handleDelete,
    handleSearch,
    setEditedRole,
  } = useDashboard();

  return (
    <>
      <Header handleSearch={ handleSearch } />
      <SectionTable>
        <UserTable
          users={ users }
          editingId={ editingId }
          editedRole={ editedRole }
          handleUpdate={ handleUpdate }
          handleEdit={ handleEdit }
          handleDelete={ handleDelete }
          setEditedRole={ setEditedRole }
        />
        <NotFoundUser loader={ loading } usersLength={ users.length } />
      </SectionTable>
    </>
  );
}