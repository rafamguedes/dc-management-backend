import { FaUserPlus } from 'react-icons/fa';
import { User } from '../../types/UserTypes';
import { UserInfo, Menu, Footer, NavBar } from './Style';
import { FaHouse } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import useDashboard from '../../hooks/useDashboard';

const NavBarSide = () => {
  const user: User = JSON.parse(localStorage.getItem('user') || '{}');
  const { handleLogout } = useDashboard();
  
  return (
    <NavBar>
      <UserInfo>
        {user && (
          <div>
            <img src={ user.image } alt={user.username} />
            <h2>{ user.username }</h2>
            <p>{ user.email }</p>
            <button onClick={ () => handleLogout() }>Logout</button>
          </div>
        )}
      </UserInfo>
      <Menu>
        <ul>
          <li><Link to="/dashboard"><FaHouse size={ 20 } /> Dashboard</Link></li>
          <li><Link to="/create"><FaUserPlus size={ 20 } /> Create User</Link></li>
        </ul>
      </Menu>
      <Footer>
        <p>Developed by Rafael Guedes</p>
      </Footer>
    </NavBar>
  );
};

export default NavBarSide;