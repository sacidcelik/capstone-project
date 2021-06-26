import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { useEffect, useState } from 'react';

import SaveAddButton from '../components/SaveAddButton';
import Shelf from '../components/Shelf';
import { ReactComponent as BackArrow } from '../images/arrowBackward.svg';
import { ReactComponent as ForwardArrow } from '../images/arrowForward.svg';

export default function MyShelves({
  shelves,
  onGetCompartmentBooks,
  onProvideDetailedShelf,
  onGetShelfBooks,
}) {
  const [shelfIndex, setShelfIndex] = useState(0);
  const [bookImages, setBookImages] = useState([]);

  useEffect(() => {
    setBookImages(onGetShelfBooks(shelves[shelfIndex]));
  }, [shelfIndex, shelves, onGetShelfBooks]);

  console.log(bookImages);

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
          <ShelfNav data-test-id="shelves-nav">
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
            <Shelf
              shelf={shelves[shelfIndex]}
              onGetCompartmentBooks={onGetCompartmentBooks}
              onProvideDetailedShelf={onProvideDetailedShelf}
              isSaved={true}
              bookImages={bookImages}
            />
          </ShelfWrapper>
        </>
      )}
      <LinkStyled to="/myshelves/createshelf">
        <SaveAddButton text={'Add New Shelf'} />
      </LinkStyled>
    </ShelfPage>
  );
}

const ShelfPage = styled.main`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const NoShelvesMessage = styled.p`
  margin: 1rem;
`;

const ShelfNav = styled.nav`
  align-items: center;
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  margin: 1rem auto 0.5rem;
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
  height: 55vh;
  justify-content: center;
  margin: 0 auto 1rem;
  width: 95%;
`;
const LinkStyled = styled(Link)`
  display: flex;
  justify-content: center;
  text-decoration: none;
  width: 100%;
`;

MyShelves.propTypes = {
  shelves: PropTypes.array,
  onGetCompartmentBooks: PropTypes.func,
  onProvideDetailedShelf: PropTypes.func,
};
