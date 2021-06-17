import styled from 'styled-components/macro';
import PropTypes from 'prop-types';

export default function BookDetails({ book, isStatic }) {
  return (
    <DetailsCard>
      <BookInformation>
        <BookImage>
          <img
            src={
              book.volumeInfo?.imageLinks?.thumbnail ||
              book.volumeInfo?.imageLinks?.smallThumbnail
            }
            alt={book.volumeInfo.title || 'Book Cover'}
          />
        </BookImage>
        <BookSpecs>
          <p>{book.volumeInfo?.title}</p>
          {book.volumeInfo.subtitle && <p>{book.volumeInfo.subtitle}</p>}
          <p>{book.volumeInfo?.authors?.[0]}</p>
          <p>ReleaseDate (to come)</p>
          <p>
            {`ISBN: ${book.volumeInfo?.industryIdentifiers[0]?.identifier}`}
          </p>
          <p>AddedDate (to come) </p>
        </BookSpecs>
      </BookInformation>
    </DetailsCard>
  );
}

const DetailsCard = styled.article`
  background-color: var(--background);
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
  img {
    width: 100%;
  }
`;

const BookSpecs = styled.div`
  width: 60%;
  font-size: 0.8rem;

  p {
    margin-bottom: 0.5rem;
  }

  p:first-child {
    font-size: 1rem;
    max-height: 3.6rem;
    overflow: hidden;
  }
`;
