import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { useState } from 'react';

import AddAndRemoveButton from './AddAndRemoveButton';
import ShelfSelector from './ShelfSelector';

export default function SearchResult({
  searchedBooks,
  isStatic,
  onToggleToAndFromLibrary,
  isInLibrary,
  shelves,
  onSelectShelf,
}) {
  const [isSelector, setIsSelector] = useState(false);
  const [selectedBook, setSelectedBook] = useState({});

  function updateSelector(bool) {
    setIsSelector(bool);
  }

  function provideBook(book) {
    setSelectedBook(book);
  }

  return (
    <>
      {isSelector && (
        <ShelfSelector
          shelves={shelves}
          book={selectedBook}
          onSetIsSelector={updateSelector}
          onSelectShelf={onSelectShelf}
        />
      )}
      <SearchResultSection isStatic={isStatic}>
        {searchedBooks.map((book, index) => (
          <SearchResultCard
            key={index}
            isStatic={isStatic}
            data-test-id="search-result"
          >
            <img
              src={book.volumeInfo?.imageLinks?.thumbnail}
              width="58"
              height="90"
              alt={book.volumeInfo.title || 'Book Cover'}
            />
            <BookInfo>
              <BookTitle>
                <p>{book.volumeInfo?.title}</p>
              </BookTitle>

              <p>{book.volumeInfo?.authors?.[0]}</p>
            </BookInfo>
            <AddAndRemoveButton
              onToggleToAndFromLibrary={() => onToggleToAndFromLibrary(book)}
              isInLibrary={isInLibrary(book)}
              onSetIsSelector={updateSelector}
              onProvideBook={() => provideBook(book)}
            />
          </SearchResultCard>
        ))}
      </SearchResultSection>
    </>
  );
}

const SearchResultSection = styled.section`
  padding-bottom: ${(props) => (props.isStatic ? '0px' : '7rem')};
`;

const SearchResultCard = styled.article`
  align-items: center;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow-offset-x) var(--box-shadow-offset-y)
    var(--box-shadow-blur) var(--box-shadow-color);
  display: flex;
  justify-content: space-between;
  height: 110px;
  margin: 25px auto;
  padding: 1rem;
  width: ${(props) => (props.isStatic ? '350px' : '90vw')};

  img {
    margin-right: 1rem;
  }

  :nth-child(odd) {
    background-color: var(--primary);
  }

  :nth-child(even) {
    background-color: var(--secondary);
  }

  :nth-child(even) div {
    color: var(--background);
  }
`;

const BookInfo = styled.div`
  width: 50%;
  display: flex;
  height: 90px;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 0.5rem;
`;

const BookTitle = styled.div`
  max-height: 3.6rem;
  overflow: hidden;
`;

SearchResult.propTypes = {
  searchedBooks: PropTypes.array,
  onToggleToAndFromLibrary: PropTypes.func,
  isInLibrary: PropTypes.func,
};
