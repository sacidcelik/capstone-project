import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import GlobalSearch from '../components/GlobalSearch';

export default function Home({
  onToggleToAndFromLibrary,
  isInLibrary,
  shelves,
  onSelectShelf,
  library,
  onRenderBookDetails,
}) {
  const recentBooks = library.slice(library.length - 3, library.length);

  console.log(recentBooks);

  return (
    <HomePage>
      <SectionHeadline>Add new book</SectionHeadline>
      <GlobalSearch
        onToggleToAndFromLibrary={onToggleToAndFromLibrary}
        isInLibrary={isInLibrary}
        shelves={shelves}
        onSelectShelf={onSelectShelf}
      />
      <SectionHeadline>My Bookshelves</SectionHeadline>
      <Link to="/myshelves">
        <ShelvesCard>
          {shelves.length === 0 && <h5>You have no saved shelves.</h5>}
          <ShelfList>
            {shelves.map(
              (shelf, index) => index < 3 && <Shelf>{shelf.name}</Shelf>
            )}
            {shelves.length > 3 && <p>+ {shelves.length - 3} more</p>}
          </ShelfList>
        </ShelvesCard>
      </Link>
      <SectionHeadline>My Library</SectionHeadline>

      <LibraryCard>
        <Link to="/mybooks">
          <p>Recently added books</p>
        </Link>
        {recentBooks.length > 0 &&
          recentBooks.map((book) => (
            <BookCard onClick={() => onRenderBookDetails(book)}>
              <BookImage>
                <img
                  src={book.volumeInfo.imageLinks.thumbnail}
                  alt="book cover"
                  width="36"
                  height="48"
                />
              </BookImage>
              <BookTitle>{book.volumeInfo.title}</BookTitle>
            </BookCard>
          ))}
      </LibraryCard>
    </HomePage>
  );
}

const HomePage = styled.main`
  margin: 0 auto 7rem;
  width: 95%;
  a {
    text-decoration: none;
  }
`;

const SectionHeadline = styled.h4`
  margin: 1.5rem auto 1rem;
`;

const ShelvesCard = styled.section`
  background: var(--secondary);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow-offset-x) var(--box-shadow-offset-y)
    var(--box-shadow-blur) var(--box-shadow-color);
  min-height: 20vh;
  padding: 0.5rem;
  margin: 0 auto;

  h5 {
    color: var(--background);
    text-align: center;
  }
`;

const ShelfList = styled.ol`
  color: var(--background);
  margin: 0;
  padding: 0;
`;

const Shelf = styled.li`
  margin: 0.5rem 1rem 1rem;
  padding: 0;
`;

const LibraryCard = styled.section`
  background: var(--primary);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow-offset-x) var(--box-shadow-offset-y)
    var(--box-shadow-blur) var(--box-shadow-color);
  margin: 0 auto;
  padding: 0.5rem;
  min-height: 20vh;

  a {
    color: black;
  }
`;

const BookCard = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  background: var(--background);
  border-radius: var(--border-radius);
  max-height: 64px;
  margin: 0.5rem auto;
  padding: 0.5rem;
  width: 100%;
`;

const BookImage = styled.div``;

const BookTitle = styled.div`
  width: 60%;
  max-height: 3.6rem;
  overflow: hidden;
`;

Home.propTypes = {
  onToggleToAndFromLibrary: PropTypes.func,
  isInLibrary: PropTypes.func,
  shelves: PropTypes.array,
  onSelectShelf: PropTypes.func,
};
