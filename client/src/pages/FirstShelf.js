import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom';

import ShelfCreator from '../components/ShelfCreator';
import { toast } from 'react-toastify';

export default function FirstShelf({ activeUser, onSaveShelf, shelves }) {
  const history = useHistory();

  function handleFinishSetUp() {
    history.replace('/home');
    toast.dismiss();
  }

  return (
    <FirstShelfPage>
      <HeadlineSection>
        {shelves.length === 0 ? (
          <h3>
            Hello {activeUser?.name}! <br /> Please set up your first bookshelf:{' '}
          </h3>
        ) : (
          <SuccessHeadline>
            <h3>
              That's a great bookshelf, {activeUser?.name}! <br />
              You are ready to proceed.
            </h3>
            <h2>Enjoy Bookshelves!</h2>{' '}
          </SuccessHeadline>
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

const SuccessHeadline = styled.section`
  margin-top: 10rem;
`;

const FinishButton = styled.button`
  border: none;
  border-radius: var(--border-radius);
  background-color: var(--primary);
  height: 40px;
  position: absolute;
  bottom: 5rem;
  width: 95%;
`;

FirstShelf.propTypes = {
  activeUser: PropTypes.object,
  onSaveShelf: PropTypes.func,
  shelves: PropTypes.array,
};
