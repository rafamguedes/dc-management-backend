import { User } from '../../types/UserTypes';
import { ContainerFilter, Wrapper } from './Style';

type FilterProps = {
  handleFilter: (value: string) => void;
  users: User[];
};

export function Filter({ handleFilter, users }: FilterProps) {
  return (
    <ContainerFilter>
      <Wrapper>
        <div className="totals">
          <span>Total Users: {users.length}</span>
          {' | '}
          <span>Admins: {users.filter((user) => user.role === 'admin').length}</span>
          {' | '}
          <span>Users: {users.filter((user) => user.role === 'user').length}</span>
        </div>

        <div className="filter">
          <span>Filter by role</span>
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