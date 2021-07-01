import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';

import StartLoginButton from '../components/StartLoginButton';
import { ReactComponent as BackArrow } from '../images/arrowBackward.svg';
import { toast } from 'react-toastify';

export default function Access({
  isNewUser,
  onHandleAccess,
  grantAccess,
  onCheckForUser,
}) {
  const initialUser = { name: '' };
  const [user, setUser] = useState(initialUser);
  const buttonText = () => (isNewUser ? 'CREATE USER' : 'SIGN IN');

  const history = useHistory();

  function handleRoute() {
    history.push('/');
  }
  const handleLoginRoute = useCallback(() => {
    if (isNewUser && grantAccess) return history.replace('/firstShelf');
    if (!isNewUser && grantAccess) return history.replace('/home');
  }, [isNewUser, grantAccess, history]);

  useEffect(() => {
    handleLoginRoute();
  }, [grantAccess, handleLoginRoute]);

  function inputChangeHandler(event) {
    setUser({ name: event.target.value });
    toast.dismiss();
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    if (user.name.length > 0) {
      onHandleAccess(user);
      isNewUser &&
        (onCheckForUser(user)
          ? toast.error(
              'User already exists. If this is your user name, please go back and Sign In',
              {
                toastId: 'signInError',
                position: toast.POSITION.BOTTOM_CENTER,
              }
            )
          : toast.success('Created new user', {
              toastId: 'signInSuccess',
              position: toast.POSITION.BOTTOM_CENTER,
            }));
      !isNewUser &&
        (onCheckForUser(user)
          ? toast.success('Successfully logged in', {
              toastId: 'signInSuccess',
              position: toast.POSITION.BOTTOM_CENTER,
            })
          : toast.error(
              'User is not known, please check your user name or return and click "Start Now".',
              {
                toastId: 'signInError',
                position: toast.POSITION.BOTTOM_CENTER,
              }
            ));
    } else {
      toast.error('Enter a user name', {
        toastId: 'userNameError',
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  }

  return (
    <AccessPage>
      <BackNav onClick={handleRoute}>
        <BackArrow /> <p>Back</p>
      </BackNav>
      <h3>
        Enter your name here
        {isNewUser
          ? ' to create a new user'
          : ' to sign in and access your bookshelves'}
      </h3>
      <Form onSubmit={handleFormSubmit}>
        <NameInput
          type="name"
          placeholder="Your Name"
          onChange={inputChangeHandler}
          value={user.name}
        />
        <StartLoginButton text={buttonText()} isStart={isNewUser} />
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
  background: white;
  border: none;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow-offset-x) var(--box-shadow-offset-y)
    var(--box-shadow-blur) var(--box-shadow-color);
  display: inline;
  font-size: 1rem;
  margin: 1rem auto;
  height: 46px;
  padding: 0 1rem;
  width: 280px;

  :focus {
    outline-color: var(--background);
  }
`;

Access.propTypes = {
  isNewUser: PropTypes.bool,
  onHandleAccess: PropTypes.func,
  grantAccess: PropTypes.bool,
  onCheckForUser: PropTypes.func,
};
