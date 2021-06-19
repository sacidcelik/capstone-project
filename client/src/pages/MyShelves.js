import { useState } from 'react';

import styled from 'styled-components';
import Shelf from '../components/Shelf';
import ShelfCreator from '../components/ShelfCreator';
import { ReactComponent as BackArrow } from '../images/arrowBackward.svg';
import { ReactComponent as ForwardArrow } from '../images/arrowForward.svg';

export default function MyShelves({ onSaveShelf, shelves }) {
  const [shelfIndex, setShelfIndex] = useState(0);

  function goForward() {
    if (isShelfAfter()) setShelfIndex(shelfIndex + 1);
  }

  function goBackward() {
    if (isShelfBefore()) setShelfIndex(shelfIndex - 1);
  }
  function isShelfAfter() {
    return shelves.length > shelfIndex + 1;
  }

  function isShelfBefore() {
    return shelfIndex > 0;
  }

  return (
    <ShelfPage>
      <h2>My Shelves</h2>
      {shelves.length < 1 && <h3>You currently have no shelves.</h3>}
      {shelves.length >= 1 && (
        <>
          <ShelfNav>
            <BackArrowStyled
              title="Go Back"
              onClick={() => goBackward()}
              isActive={isShelfBefore()}
            />
            <h3>{shelves[shelfIndex].name}</h3>
            <ForwardArrowStyled
              title="Go Forward"
              onClick={() => goForward()}
              isActive={isShelfAfter()}
            />
          </ShelfNav>
          <ShelfWrapper>
            <Shelf shelf={shelves[shelfIndex]} />
          </ShelfWrapper>
        </>
      )}

      <ShelfCreator onSaveShelf={onSaveShelf} />
    </ShelfPage>
  );
}

const ShelfPage = styled.main``;

const ShelfNav = styled.div`
  margin: 1rem auto;
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 90vw;
`;

const BackArrowStyled = styled(BackArrow)`
  display: ${(props) => (props.isActive ? '' : 'none')};
`;

const ForwardArrowStyled = styled(ForwardArrow)`
  display: ${(props) => (props.isActive ? '' : 'none')};
`;

const ShelfWrapper = styled.article`
  align-items: flex-end;
  display: flex;
  gap: 1px;
  justify-content: center;
  margin: 1rem auto;
  height: 50vh;
  width: 90vw;
`;
