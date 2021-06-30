import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

export default function LibraryDashboard({
  recentBooks,
  onRenderBookDetails,
  isStatic,
}) {
  return (
    <LibraryCard isStatic={isStatic}>
      <Link to="/mybooks">
        <p>Recently added books</p>
      </Link>
      {recentBooks.length === 0 && (
        <h5>
          You have not added any books to your library yet. Start by searching
          for a book.
        </h5>
      )}
      {recentBooks.length > 0 &&
        recentBooks.map((book) => (
          <BookCard key={book.id} onClick={() => onRenderBookDetails(book)}>
            <div>
              <img
                src={book.volumeInfo?.imageLinks?.thumbnail}
                alt="book cover"
                width="36"
                height="48"
              />
            </div>
            <BookTitle>
              <p>{book.volumeInfo?.title}</p>
            </BookTitle>
            <AddedDate>
              <p>Added on: {book.addToLibraryDate}</p>
            </AddedDate>
          </BookCard>
        ))}
    </LibraryCard>
  );
}

const LibraryCard = styled.section`
  background: var(--primary);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow-offset-x) var(--box-shadow-offset-y)
    var(--box-shadow-blur) var(--box-shadow-color);
  margin: 0 auto;
  min-height: ${(props) => (props.isStatic ? '' : '20vh')};
  padding: 0.5rem;
  width: ${(props) => (props.isStatic ? '375px' : '')};
  a {
    color: black;
    text-decoration: none;
  }
  h5 {
    text-align: center;
  }
`;

const BookCard = styled.div`
  align-items: center;
  background: var(--background);
  border-radius: var(--border-radius);
  display: flex;
  gap: 1rem;
  justify-content: flex-start;
  max-height: 64px;
  margin: 0.5rem auto;
  padding: 0.5rem;
  width: 100%;
`;

const BookTitle = styled.div`
  width: 60%;
  max-height: 3.6rem;
  overflow: hidden;
  text-align: center;
`;

const AddedDate = styled.div`
  text-align: center;
  width: 25%;
`;

LibraryDashboard.propTypes = {
  recentBooks: PropTypes.array,
  onRenderBookDetails: PropTypes.func,
};
