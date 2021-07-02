import { NavLink } from 'react-router-dom';
import styled from 'styled-components/macro';
import { ReactComponent as HomeButton } from '../images/navHome.svg';
import { ReactComponent as ShelfButton } from '../images/navShelves.svg';
import { ReactComponent as BooksButton } from '../images/navBooks.svg';

export default function NavFooter({ isStatic }) {
  return (
    <NavWrapper isStatic={isStatic}>
      <NavLink to="/home">
        <HomeButtonStyled title="Home" role="img" width="50" height="50" />
      </NavLink>
      <NavLink to="/myshelves">
        <ShelfButtonStyled
          title="My Shelves"
          role="img"
          width="50"
          height="43"
        />
      </NavLink>
      <NavLink to="/mybooks">
        <BooksButtonStyled title="My Books" role="img" width="57" height="49" />
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
  height: 70px;
  justify-content: space-around;
  margin: ${(props) => (props.isStatic ? 'auto' : '')};
  position: ${(props) => (props.isStatic ? 'static' : 'fixed')};
  width: ${(props) => (props.isStatic ? '414px' : '100vw')};
`;

const HomeButtonStyled = styled(HomeButton)`
  .active & path {
    fill: var(--tertiary);
    stroke: none;
  }
`;

const ShelfButtonStyled = styled(ShelfButton)`
  .active & path,
  .active & rect {
    fill: var(--tertiary);
    stroke: none;
  }
  .active & .e {
    stroke: #fff;
  }
`;

const BooksButtonStyled = styled(BooksButton)`
  .active & path {
    fill: var(--tertiary);
    stroke: none;
  }
`;
