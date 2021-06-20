import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Shelf from '../components/Shelf';
import SaveAddButton from '../components/SaveAddButton';
import { ReactComponent as BackArrow } from '../images/arrowBackward.svg';
import { ReactComponent as ForwardArrow } from '../images/arrowForward.svg';

export default function MyShelves({ shelves }) {
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
      {shelves.length < 1 && (
        <NoShelvesMessage>You currently have no shelves.</NoShelvesMessage>
      )}
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
      <Link to="/myshelves/createshelf">
        <SaveAddButton text={'Add New Shelf'} />
      </Link>
    </ShelfPage>
  );
}

const ShelfPage = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    display: flex;
    justify-content: center;
    text-decoration: none;
    width: 100%;
  }
`;

const NoShelvesMessage = styled.p`
  margin: 1rem;
`;

const ShelfNav = styled.div`
  margin: 1rem auto 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 60vw;
`;

const BackArrowStyled = styled(BackArrow)`
  visibility: ${(props) => (props.isActive ? '' : 'hidden')};
`;

const ForwardArrowStyled = styled(ForwardArrow)`
  visibility: ${(props) => (props.isActive ? '' : 'hidden')};
`;

const ShelfWrapper = styled.article`
  align-items: flex-end;
  display: flex;
  gap: 1px;
  justify-content: center;
  margin: 0 auto 1rem;
  height: 55vh;
  width: 95%;
`;
