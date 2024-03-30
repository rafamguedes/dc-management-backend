import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { User } from '../../types/UserTypes';
import ApiService from '../../services/UserService';
import { Container, Footer, Header, Icons, Main, Menu, NavBar, Search, Section, SectionTable, Table, Title, UserInfo } from './Style';
import { FaGithub, FaLinkedinIn, FaSearch, FaUserPlus } from 'react-icons/fa';
import IconEdit from '../../assets/images/iconEdit.svg';
import IconDelete from '../../assets/images/iconDelete.svg';
import { FaHouse } from 'react-icons/fa6';

export function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [editedRole, setEditedRole] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  useEffect(() => {
    const handleFetch = async () => {
      try {
        const response = await ApiService.getUsers();
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    handleFetch();
  }, []);

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

  return (
    <Container>
      <Main>
        <NavBar>
          <UserInfo>
            {user && (
              <div>
                <img src={user.image} alt={user.username} />
                <h2>{user.username}</h2>
                <p>{user.email}</p>
                <button onClick={ () => handleLogout()}>Logout</button>
              </div>
            )}
          </UserInfo>
          <Menu>
            <ul>
              <li><FaHouse size={ 20 } /> Dashboard</li>
              <li><FaUserPlus size={ 20 } /> Create User</li>
            </ul>
          </Menu>
          <Footer>
            <p>Developed by Rafael Guedes</p>
          </Footer>
        </NavBar>
        <Section>
          <Header>
            <Title>
              <h1>Dashboard</h1>
            </Title>
            <Search>
              <input type="text" placeholder="Search" />
              <FaSearch size={ 25 } />
            </Search>
            <Icons>
              <FaGithub size={ 30 } />
              <FaLinkedinIn size={ 30 } />
            </Icons>
          </Header>
          <SectionTable>
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
                {users.map((user: User) => (
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
                      onClick={ () => editingId === +user.id ? handleUpdate(+user.id) : handleEdit(+user.id, user.role) }
                    >
                      <img src={ editingId === +user.id ? IconEdit : IconEdit } alt="Edit" />
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
                {loading ?
                  <h1>Loading...</h1>
                  : users.length === 0 && <h1>No users found</h1>
                }
              </tbody>
            </Table>
          </SectionTable>
        </Section>
      </Main>
    </Container>
  );
}