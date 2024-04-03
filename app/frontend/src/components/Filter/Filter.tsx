import useDashboard from "../../hooks/useDashboard";
import { ContainerFilter, Wrapper } from "./Style";

export function Filter() {
  const { users, handleFilter } = useDashboard();

  return (
    <ContainerFilter>
      <Wrapper>
        <div>
          <span>Total Users: {users.length}</span>
          {' | '}
          <span>Admins: {users.filter((user) => user.role === 'admin').length}</span>
          {' | '}
          <span>Users: {users.filter((user) => user.role === 'user').length}</span>
        </div>

        <div>
          <span>Filter by:</span>
            <select onChange={(event) => handleFilter(event.target.value)}>
                <option value="all">All</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
            </select>
        </div>
      </Wrapper>
    </ContainerFilter>
  );
}