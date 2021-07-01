import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import StartLoginButton from '../components/StartLoginButton';
import BookshelfLogo from '../images/bookshelfLogo.svg';
import TriangleOrange from '../images/frontPageTriangleOrange.svg';
import TriangleGreen from '../images/frontPageTriangleGreen.svg';

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
          <StartLoginButton isStart text="START NOW" />
        </Link>
        <Link to="/accessPage" onClick={() => handleAccess(false)}>
          <StartLoginButton text="SIGN IN" />
        </Link>
      </ButtonSection>
      <OrangeTriangle src={TriangleOrange} alt="Orange Triangle" />
      <GreenTriangle src={TriangleGreen} alt="Green Triangle" />
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
  margin-top: 8rem;
`;

const ButtonSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 8rem;
`;
const OrangeTriangle = styled.img`
  position: fixed;
  bottom: -1px;
  left: -1px;
`;
const GreenTriangle = styled.img`
  position: fixed;
  bottom: -1px;
  right: -1px;
`;
Start.propTypes = {
  onSetIsNewUser: PropTypes.func,
};
