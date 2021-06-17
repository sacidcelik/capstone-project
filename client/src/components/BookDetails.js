import styled from 'styled-components/macro';
import PropTypes from 'prop-types';
import UnreadReadButton from './UnreadReadButton';

import BookRating from './BookRating';

export default function BookDetails({
  book,
  isStatic,
  onRemoveDetailView,
  onAddRating,
}) {
  return (
    <DetailsCard onClick={onRemoveDetailView}>
      <BookInformation>
        <BookImageWrapper>
          <img
            src={
              book.volumeInfo?.imageLinks?.thumbnail ||
              book.volumeInfo?.imageLinks?.smallThumbnail
            }
            alt={book.volumeInfo?.title || 'Book Cover'}
            width="128"
            height="192"
          />
          <UnreadReadButton />
        </BookImageWrapper>

        <BookSpecs>
          <BookTitle>{book.volumeInfo?.title}</BookTitle>
          {book.volumeInfo.subtitle && (
            <BookSubTitle>{book.volumeInfo.subtitle}</BookSubTitle>
          )}
          <p>{book.volumeInfo?.authors?.[0]}</p>
          <p>Released: {book.volumeInfo?.publishedDate?.substring(0, 4)}</p>
          <p>ISBN: {book.volumeInfo?.industryIdentifiers[0]?.identifier}</p>
        </BookSpecs>
      </BookInformation>
      <RatingWrapper>
        <p>Rating: </p>
        <RatingStarWrapper>
          <BookRating onAddRating={onAddRating} book={book} />
        </RatingStarWrapper>
      </RatingWrapper>
    </DetailsCard>
  );
}

const DetailsCard = styled.article`
  background-color: var(--background);
  opacity: 0.98;
  border: 3px solid white;
  border-radius: var(--border-radius);
  box-shadow: 0 0 80px 80px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  height: 80vh;
  margin: ${(props) => (props.isStatic ? '0 auto' : '50vh 50vw')};
  padding: 1rem;
  position: ${(props) => (props.isStatic ? 'relative' : 'fixed')};
  transform: ${(props) => (props.isStatic ? '' : 'translate(-50%, -70%)')};
  width: 90vw;
  z-index: 100;
`;

const BookInformation = styled.section`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
`;

const BookImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.5rem;
  width: 40%;
  height: 100%;

  img {
    box-shadow: var(--box-shadow-offset-x) var(--box-shadow-offset-y)
      var(--box-shadow-blur) var(--box-shadow-color);
  }
`;

const BookSpecs = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  p {
    margin-top: 0.8rem;
  }
`;

const BookTitle = styled.h2`
  font-size: 1.2rem;
  max-height: 4.1rem;
  overflow: hidden;
`;

const BookSubTitle = styled.h5`
  max-height: 1.8rem;
  overflow: hidden;
  margin: 0;
  margin-top: 0.3rem;
`;

const RatingWrapper = styled.section`
  margin-top: 1rem;
`;

const RatingStarWrapper = styled.div`
  margin-top: 1rem;
`;
