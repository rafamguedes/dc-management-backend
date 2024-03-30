import { FaSearch, FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { Title, Search, Icons, HeaderContainer } from './Style';

type HeaderProps = {
  handleSearch: (value: string) => void;
};

const Header = ({ handleSearch }: HeaderProps) => (
  <HeaderContainer>
    <Title>
      <h1>Dashboard</h1>
    </Title>
    <Search>
      <input
        type="text"
        placeholder="Search"
        onChange={ (e) => handleSearch(e.target.value) }
      />
      <FaSearch size={ 25 } />
    </Search>
    <Icons>
      <FaLinkedinIn size={ 25 } />
      <FaGithub size={ 25 } />
    </Icons>
  </HeaderContainer>
);

export default Header;