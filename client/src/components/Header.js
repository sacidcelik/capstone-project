import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';

import BookshelfIcon from '../images/bookshelfLogo.svg';

export default function Header({ isStatic, noLink }) {
  return (
    <HeaderWrapper isStatic={isStatic}>
      {noLink !== true && (
        <Link to="/home">
          <img
            src={BookshelfIcon}
            alt="Bookshelves Icon"
            width="51"
            height="44"
          />
        </Link>
      )}
      {noLink && (
        <img
          src={BookshelfIcon}
          alt="Bookshelves Icon"
          width="51"
          height="44"
        />
      )}
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  align-items: flex-end;
  background: var(--background);
  border-bottom: 1px solid var(--secondary);
  display: flex;
  height: 70px;
  justify-content: center;
  margin: ${(props) => (props.isStatic ? 'auto' : '')};
  margin-bottom: 1rem;
  padding-bottom: 5px;
  position: ${(props) => (props.isStatic ? 'static' : 'sticky')};
  top: 0;
  width: ${(props) => (props.isStatic ? '414px' : '100vw')};
  z-index: 100;

  a {
    text-decoration: none;
  }
`;
