import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import ShelfCreator from '../components/ShelfCreator';

export default function FirstShelf({ onSaveShelf, activeUser, shelves }) {
  const history = useHistory();

  function handleFinishSetUp() {
    history.replace('/home');
  }

  return (
    <FirstShelfPage>
      <HeadlineSection>
        {shelves.length === 0 ? (
          <h3>{activeUser?.name}, set up your first bookshelf here: </h3>
        ) : (
          <>
            <h3>Great Job, {activeUser?.name}! You are ready to proceed.</h3>
            <h2>Enjoy Bookshelves!</h2>{' '}
          </>
        )}
      </HeadlineSection>
      {shelves.length < 1 && (
        <ShelfCreator onSaveShelf={onSaveShelf}></ShelfCreator>
      )}
      {shelves.length > 0 && (
        <FinishButton onClick={handleFinishSetUp}>FINISH SET UP</FinishButton>
      )}
    </FirstShelfPage>
  );
}
const FirstShelfPage = styled.main`
  align-items: center;
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
`;

const HeadlineSection = styled.section`
  width: 95%;

  h2 {
    margin-top: 2rem;
  }
`;

const FinishButton = styled.button`
  border: none;
  border-radius: var(--border-radius);
  background-color: var(--primary);
  height: 40px;
  position: absolute;
  bottom: 2rem;
  width: 95%;
`;

FirstShelf.propTypes = {
  onSaveShelf: PropTypes.func,
  activeUser: PropTypes.object,
  shelves: PropTypes.array,
};
