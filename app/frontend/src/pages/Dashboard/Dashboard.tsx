import NotFoundUser from '../../components/NotFound/NotFound';
import UserTable from '../../components/Table/Table';
import useDashboard from '../../hooks/useDashboard';
import Header from '../../components/Header/Header';
import { SectionTable } from './Style';
import { Filter } from '../../components/Filter/Filter';

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
    handleFilter,
    setEditedRole,
  } = useDashboard();

  return (
    <>
      <Header handleSearch={ handleSearch } />
      <Filter handleFilter={ handleFilter } users={ users } />
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