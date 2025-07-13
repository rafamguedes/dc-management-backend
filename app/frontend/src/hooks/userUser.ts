import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import { User } from '../types/UserTypes';
import { useState, useEffect } from 'react';
import { getUsers, updateUser, deleteUser } from '../services/userService';

const useUser = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedRole, setEditedRole] = useState('');

  useEffect(() => {
    const handleFetch = async () => {
      try {
        const response = await getUsers();
        const uniqueUsers = response.data.filter((user: User, index: number, self: User[]) =>
          index === self.findIndex((u: User) => u.username === user.username)
        );
        const sortByRole = uniqueUsers.sort((a: User, b: User) => a.role.localeCompare(b.role));
        setUsers(sortByRole);
        setAllUsers(sortByRole);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    handleFetch();
  }, []);

  const handleFilter = (role: string) => {
    if (role === 'all') {
      setUsers(allUsers);
    } else {
      const filteredUsers = allUsers.filter((user) => user.role === role);
      setUsers(filteredUsers);
    }
  };

  const handleEdit = (id: number, role: string) => {
    if (role === 'admin') {
      return Swal.fire({
        icon: 'error',
        title: 'Cannot update an admin',
        showConfirmButton: false,
        timer: 1500,
      });
    }

    if (role !== 'admin' && role !== 'user') {
      return Swal.fire({
        icon: 'error',
        title: 'Invalid role, must be admin or user',
        showConfirmButton: false,
        timer: 1500,
      });
    }

    setEditingId(id);
    setEditedRole(role);
  };

  const handleUpdate = async (id: number) => {
    try {
      await updateUser(id, { role: editedRole } as User);
      const updatedUsers = users.map((user) => {
        if (+user.id === id) {
          return { ...user, role: editedRole };
        }
        return user;
      });
      setUsers(updatedUsers);
      setEditingId(null);
      Swal.fire({
        icon: 'success',
        title: 'User updated successfully',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  const handleDelete = async (id: number) => {
    const isAdmin = users.find((user) => +user.id === id)?.role === 'admin';

    if (isAdmin) {
      return Swal.fire({
        icon: 'error',
        title: 'Cannot delete an admin',
        showConfirmButton: false,
        timer: 1500,
      });
    }

    const result = await handleSwalDelete();

    if (!result.isConfirmed) return;

    try {
      await deleteUser(id);
      const deletedUser = users.filter((user) => +user.id !== id);
      setUsers(deletedUser);
      Swal.fire({
        icon: 'success',
        title: 'User deleted successfully',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  const handleSwalDelete = () => {
    return Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#000',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });
  };

  const handleLogout = () => {
    localStorage.clear();
    setUsers([]);
    navigate('/');
  };

  const handleRefresh = async () => {
    try {
      const response = await getUsers();
      const uniqueUsers = response.data.filter((user: User, index: number, self: User[]) =>
        index === self.findIndex((u: User) => u.username === user.username)
      );
      const sortByRole = uniqueUsers.sort((a: User, b: User) => a.role.localeCompare(b.role));
      setUsers(sortByRole);
      setAllUsers(sortByRole);
    } catch (error) {
      console.error('Failed to refresh users:', error);
    }
  };

  return {
    users,
    loading,
    editingId,
    editedRole,
    setUsers,
    handleEdit,
    handleUpdate,
    handleDelete,
    handleLogout,
    setEditedRole,
    handleFilter,
    handleRefresh,
  };
};

export default useUser;