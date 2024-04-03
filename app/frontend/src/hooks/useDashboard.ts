import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import { User } from '../types/UserTypes';
import { useState, useEffect } from 'react';
import ApiService from '../services/UserService';

const useDashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedRole, setEditedRole] = useState('');

  useEffect(() => {
    const handleFetch = async () => {
      try {
        const response = await ApiService.getUsers();
        const sortByRole = response.data.sort((a: User, b: User) => a.role.localeCompare(b.role));
        setUsers(sortByRole);
        setAllUsers(response.data);
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

  const handleSearch = async (search: string) => {
    try {
      const searchResult = allUsers.filter((user) =>
        user.username.toLowerCase().includes(search.toLowerCase()));
      setUsers(searchResult);
    } catch (error) {
      console.error('Failed to search users:', error);
    }
  };

  const handleEdit = (id: number, role: string) => {
    setEditingId(id);
    setEditedRole(role);
  };

  const handleUpdate = async (id: number) => {
    try {
      await ApiService.updateUser(id, { role: editedRole } as User);
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
    const result = await handleSwalDelete();

    if (!result.isConfirmed) return;

    try {
      await ApiService.deleteUser(id);
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

  return {
    users,
    loading,
    editingId,
    editedRole,
    setUsers,
    handleSearch,
    handleEdit,
    handleUpdate,
    handleDelete,
    handleLogout,
    setEditedRole,
    handleFilter,
  };
};

export default useDashboard;