import { FaUserPlus } from 'react-icons/fa';
import { User } from '../../types/UserTypes';
import { UserInfo, Menu, Footer, NavBar } from './Style';
import { FaHouse } from 'react-icons/fa6';

type NavBarProps = {
  user: User | null;
  handleLogout: () => void;
}

const NavBarSide = ({ user, handleLogout }: NavBarProps) => (
  <NavBar>
    <UserInfo>
      {user && (
        <div>
          <img src={ user.image } alt={user.username} />
          <h2>{ user.username }</h2>
          <p>{ user.email }</p>
          <button onClick={ handleLogout }>Logout</button>
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
);

export default NavBarSide;