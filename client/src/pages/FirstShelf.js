import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';

import ShelfCreator from '../components/ShelfCreator';

export default function FirstShelf({ onSaveShelf, activeUser, shelves }) {
  return (
    <FirstShelfPage>
      <h3>{activeUser}, Set Up Your First Shelf Here </h3>
      <ShelfCreator onSaveShelf={onSaveShelf}></ShelfCreator>
      {shelves.length > 0 && (
        <Link to="/home">
          <FinishButton>Finish Set Up</FinishButton>
        </Link>
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
  font-size: 1.5rem;
  height: 40px;
  margin-bottom: 1rem;
  width: 280px;
`;
