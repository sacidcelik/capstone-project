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
      <h3>{activeUser?.name}, Set Up Your First Shelf Here </h3>
      <ShelfCreator onSaveShelf={onSaveShelf}></ShelfCreator>
      {shelves.length > 0 && (
        <FinishButton onClick={handleFinishSetUp}>FINISH SET UP</FinishButton>
      )}
    </FirstShelfPage>
  );
}
const FirstShelfPage = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  h3 {
    text-align: center;
  }
`;

const FinishButton = styled.button`
  border: none;
  border-radius: var(--border-radius);
  background-color: var(--primary);
  height: 40px;
  margin-bottom: 1rem;
  width: 95%;
`;

FirstShelf.propTypes = {
  onSaveShelf: PropTypes.func,
  activeUser: PropTypes.object,
  shelves: PropTypes.array,
};
