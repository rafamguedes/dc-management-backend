import { useEffect, useState } from 'react';
import ApiService from '../../services/UserService';
import { User } from '../../types/UserTypes';
import { useNavigate } from 'react-router';

export function Dashboard() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await ApiService.getUsers();
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, []);

  const Logout = () => {
    localStorage.clear();
    setUsers([]);
    navigate('/');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello, World!</h1>
        <button onClick={ () => Logout()}>Logout</button>
      </header>
      <div className="Users">
        {users.map((user: User) => (
          <div key={user.id}>
            <h2>{user.username}</h2>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}