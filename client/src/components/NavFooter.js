import styled from 'styled-components/macro';
import { NavLink } from 'react-router-dom';
import { ReactComponent as HomeButton } from '../images/navHome.svg';
import { ReactComponent as ShelfButton } from '../images/navShelves.svg';
import { ReactComponent as BooksButton } from '../images/navBooks.svg';

export default function NavFooter({ isStatic }) {
  return (
    <NavWrapper isStatic={isStatic}>
      <NavLink to="/home">
        <HomeButtonStyled title="Home" role="img" />
      </NavLink>
      <NavLink to="/myshelves">
        <ShelfButtonStyled title="My Shelves" role="img" />
      </NavLink>
      <NavLink to="/mybooks">
        <BooksButtonStyled title="My Books" role="img" />
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
  height: 50px;
  width: 50px;
  .active & path {
    fill: var(--tertiary);
    stroke: none;
  }
`;

const ShelfButtonStyled = styled(ShelfButton)`
  height: 43px;
  width: 50px;
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
  height: 54px;
  width: 63px;
  .active & path {
    fill: var(--tertiary);
    stroke: none;
  }
`;
