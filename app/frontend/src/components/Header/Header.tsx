import { useState } from 'react';
import { FaSearch, FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { Title, Search, Icons, HeaderContainer } from './Style';
import { Link } from 'react-router-dom';

type HeaderProps = {
  handleSearch: (value: string) => void;
};

const Header = ({ handleSearch }: HeaderProps) => {
  const [searchValue, setSearchValue] = useState('');

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch(searchValue);
    }
  };

  return (
    <HeaderContainer>
      <Title>
        <h1>Dashboard</h1>
      </Title>
      <Search>
        <input
          type="text"
          placeholder="Search"
          onChange={ (e) => setSearchValue(e.target.value) }
          onKeyDown={ handleKeyDown }
        />
        <FaSearch size={ 25 } onClick={() => handleSearch(searchValue)} />
      </Search>
      <Icons data-testid="iconsHeader">
        <Link to="https://www.linkedin.com/in/rafael-magalh%C3%A3es-guedes/" target="_blank"><FaLinkedinIn size={ 25 } /></Link>
        <Link to="https://github.com/rafaelmagalhaesguedes" target="_blank"><FaGithub size={ 25 } /></Link>
      </Icons>
    </HeaderContainer>
  );
};

export default Header;