import styled from 'styled-components/macro';
import { NavLink } from 'react-router-dom';

import HomeButton from '../images/Nav-Home.svg';
import ShelfButton from '../images/Bookshelf Logo.svg';
import BooksButton from '../images/Nav-Books.svg';

export default function NavFooter() {
  return (
    <NavWrapper>
      <NavLink to="/home">
        <img src={HomeButton} alt="Home" width="70.59" height="70" />
      </NavLink>
      <NavLink to="/myshelves">
        <img src={ShelfButton} alt="My Shelves" width="70" height="60" />
      </NavLink>
      <NavLink to="/mybooks">
        <img src={BooksButton} alt="My Books" width="77.14" height="60" />
      </NavLink>
    </NavWrapper>
  );
}

const NavWrapper = styled.footer`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  height: 100px;
  border-top: 1px solid var(--secondary);
  width: 100vw;
  align-items: center;
`;
