import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';

import StartLoginButton from '../components/StartLoginButton';
import { ReactComponent as BackArrow } from '../images/arrowBackward.svg';

export default function Access({ isNewUser }) {
  const buttonText = () => (isNewUser ? 'Create User' : 'Sign In');
  const history = useHistory();

  function handleRoute() {
    history.push('/');
  }
  return (
    <AccessPage>
      <BackNav onClick={handleRoute}>
        <BackArrow /> <p>Back</p>
      </BackNav>
      <h3>
        Enter your name here{' '}
        {isNewUser
          ? 'to create a new user'
          : 'to sign in and access your bookshelves'}
      </h3>
      <Form onSubmit>
        <NameInput type="name" placeholder="Your Name" />
        {isNewUser && (
          <Link to="/firstShelf">
            <StartLoginButton text={buttonText()} isStart={isNewUser} />
          </Link>
        )}
        {!isNewUser && (
          <Link to="/home">
            <StartLoginButton text={buttonText()} isStart={isNewUser} />
          </Link>
        )}
      </Form>
    </AccessPage>
  );
}

const AccessPage = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const BackNav = styled.nav`
  display: flex;
  gap: 0.5rem;
  margin: 0 auto 1rem;
  width: 95%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NameInput = styled.input`
  height: 50px;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow-offset-x) var(--box-shadow-offset-y)
    var(--box-shadow-blur) var(--box-shadow-color);

  margin: 1rem auto;
  background: white;
  border: none;
  display: inline;
  font-size: 1rem;
  height: 46px;
  padding: 0 1rem;
  width: 280px;

  :focus {
    outline-color: var(--background);
  }
`;
