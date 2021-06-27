import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import StartLoginButton from '../components/StartLoginButton';
import BookshelfLogo from '../images/bookshelfLogo.svg';

export default function Start({ onSetIsNewUser }) {
  function handleAccess(bool) {
    onSetIsNewUser(bool);
  }

  return (
    <StartPage>
      <AppName>Bookshelves</AppName>
      <img src={BookshelfLogo} alt="Bookshelf Logo" />
      <ButtonSection>
        <Link to="/accessPage" onClick={() => handleAccess(true)}>
          <StartLoginButton isStart text="Start now" />
        </Link>
        <Link to="/accessPage" onClick={() => handleAccess(false)}>
          <StartLoginButton text="Sign in" />
        </Link>
      </ButtonSection>
    </StartPage>
  );
}

const StartPage = styled.main`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  img {
    margin-top: 1rem;
  }
`;

const AppName = styled.h1`
  margin-top: 10rem;
`;

const ButtonSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10rem;
`;

Start.propTypes = {
  onSetIsNewUser: PropTypes.func,
};
