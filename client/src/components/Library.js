import styled from 'styled-components/macro';

export default function Library({ library }) {
  return (
    <BooksWrapper>
      {library.map((book) => {
        return (
          <BookCard key={book.id}>
            <img
              src={book.volumeInfo.imageLinks.thumbnail}
              alt="Book Cover"
              width="102.4"
              height="159.2"
            />
            <div>
              <p>{book.volumeInfo.title}</p>
            </div>
          </BookCard>
        );
      })}
    </BooksWrapper>
  );
}

const BooksWrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-around;
  padding-bottom: 7rem;
  margin: 1rem auto;
  width: 90%;
`;

const BookCard = styled.article`
  align-items: center;
  background: var(--primary);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow-offset-x) var(--box-shadow-offset-y)
    var(--box-shadow-blur) var(--box-shadow-color);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  width: 45%;

  div {
    height: 3.6rem;
    overflow: hidden;
  }

  p {
    text-align: center;
  }
`;
