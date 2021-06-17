import styled from 'styled-components/macro';
import PropTypes from 'prop-types';
import UnreadReadButton from './UnreadReadButton';

export default function BookDetails({ book, isStatic, onRemoveDetailView }) {
  return (
    <DetailsCard onClick={onRemoveDetailView}>
      <BookInformation>
        <BookImage>
          <img
            src={
              book.volumeInfo?.imageLinks?.thumbnail ||
              book.volumeInfo?.imageLinks?.smallThumbnail
            }
            alt={book.volumeInfo.title || 'Book Cover'}
            width="128"
            height="192"
          />
          <UnreadReadButton />
        </BookImage>

        <BookSpecs>
          <BookTitle>{book.volumeInfo?.title}</BookTitle>
          {book.volumeInfo.subtitle && (
            <BookSubTitle style={{ marginTop: '0.4rem' }}>
              {book.volumeInfo.subtitle}
            </BookSubTitle>
          )}
          <p>{book.volumeInfo?.authors?.[0]}</p>
          <p>Released: {book.volumeInfo?.publishedDate?.substring(0, 4)}</p>
          <p>ISBN: {book.volumeInfo?.industryIdentifiers[0]?.identifier}</p>
        </BookSpecs>
      </BookInformation>
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
  height: 40%;
  width: 100%;
`;

const BookImage = styled.div`
  width: 40%;
  height: 100%;
  img {
  }
`;

const BookSpecs = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  p:not(:first-child) {
    margin-top: 0.8rem;
  }
`;

const BookTitle = styled.p`
  font-size: 1.2rem;
  max-height: 4.1rem;
  overflow: hidden;
`;

const BookSubTitle = styled.p`
  max-height: 2.4rem;
  overflow: hidden;
`;
