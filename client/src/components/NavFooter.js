import styled from 'styled-components/macro';
import { NavLink } from 'react-router-dom';

import HomeButton from '../images/navHome.svg';
import HomeButtonActive from '../images/navHomeActive.svg';
import ShelfButton from '../images/navShelves.svg';
import ShelfButtonActive from '../images/navShelvesActive.svg';
import BooksButton from '../images/navBooks.svg';
import BooksButtonActive from '../images/navBooksActive.svg';

export default function NavFooter({ isStatic }) {
  return (
    <NavWrapper isStatic={isStatic}>
      <NavLink to="/home" activeClassName="active">
        <NavHome role="img" aria-label="Home"></NavHome>
      </NavLink>
      <NavLink to="/myshelves" activeClassName="active">
        <NavShelves role="img" aria-label="My Shelves"></NavShelves>
      </NavLink>
      <NavLink to="/mybooks" activeClassName="active">
        <NavBooks role="img" aria-label="My Books"></NavBooks>
      </NavLink>
    </NavWrapper>
  );
}

const NavWrapper = styled.footer`
  align-items: center;
  background-color: var(--background);
  border-top: 1px solid var(--secondary);
  bottom: 0;
  display: flex;
  height: 100px;
  justify-content: space-around;
  position: ${(props) => (props.isStatic ? 'static' : 'fixed')};
  width: ${(props) => (props.isStatic ? 'auto' : '100vw')};
`;

const NavHome = styled.div`
  background: center / contain no-repeat url(${HomeButton});
  background-repeat: no-repeat;
  background-size: contain;
  height: 70px;
  width: 70.59px;

  .active & {
    background-image: url(${HomeButtonActive});
  }
`;

const NavShelves = styled.div`
  background: center / contain no-repeat url(${ShelfButton});
  height: 60px;
  width: 70px;

  .active & {
    background-image: url(${ShelfButtonActive});
  }
`;

const NavBooks = styled.div`
  background: center / contain no-repeat url(${BooksButton});
  height: 60px;
  width: 77.14px;

  .active & {
    background-image: url(${BooksButtonActive});
  }
`;
