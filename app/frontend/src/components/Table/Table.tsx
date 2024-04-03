import IconDelete from '../../assets/images/icons/iconDelete.svg';
import IconEdit from '../../assets/images/icons/iconEdit.svg';
import IconCheck from '../../assets/images/icons/check.svg';
import { User } from '../../types/UserTypes';
import { Table } from './Style';
import { useState } from 'react';
import useDashboard from '../../hooks/useDashboard';

type UserTableProps = {
  users: User[];
  editingId: number | null;
  editedRole: string;
  handleUpdate: (id: number) => void;
  handleEdit: (id: number, role: string) => void;
  handleDelete: (id: number) => void;
  setEditedRole: (role: string) => void;
}

const UserTable = ({
  editingId,
  editedRole,
  handleUpdate,
  handleEdit,
  handleDelete,
  setEditedRole,
}: UserTableProps ) => {
  const { users } = useDashboard();
  const [itemsToShow, setItemsToShow] = useState(10);

  const handleLoadMore = () => setItemsToShow(itemsToShow + 10);

  return (
    <Table>
      <thead>
        <tr>
          <th>Image</th>
          <th>Username</th>
          <th>Role</th>
          <th>Email</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {users.slice(0, itemsToShow).map((user: User) => (
          <tr key={ user.id }>
            <td><img src={ user.image } alt={ user.username } /></td>
            <td>{ user.username }</td>
            <td>
              {editingId === +user.id ? (
                <input 
                  type="text" 
                  value={editedRole} 
                  onChange={(e) => setEditedRole(e.target.value)} 
                />
              ) : (
                user.role
              )}
            </td>
            <td>{ user.email }</td>
            <td>
              <button
                onClick={ () => editingId === +user.id ?
                  handleUpdate(+user.id) : handleEdit(+user.id, user.role) }
              >
                <img src={ editingId === +user.id ? IconCheck : IconEdit } alt="Edit" />
              </button>
            </td>
            <td>
              <button
                onClick = { () => handleDelete(+user.id) }
              >
                <img src={ IconDelete } alt="Delete" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={6}>
            {users && itemsToShow < users.length && (
              <button className="button-load-more" onClick={ handleLoadMore }>More users</button>
            )}
          </td>
        </tr>
      </tfoot>
    </Table>
  );
            };

export default UserTable;