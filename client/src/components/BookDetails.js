import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { useState } from 'react';
import UnreadReadButton from './UnreadReadButton';
import ShelfEditor from './ShelfEditor';
import CloseIcon from '../images/closeIcon.svg';
import EditPencil from '../images/editPencil.svg';

import BookRating from './BookRating';
import { toast } from 'react-toastify';

export default function BookDetails({
  book,
  isStatic,
  onRemoveDetailView,
  onAddRating,
  onGetBookLocation,
  onSelectShelf,
  shelves,
  onToogleBookIsRead,
  bookIsRead,
  onAddLentStatusAndNotes,
  onGetBookRating,
}) {
  const [isSelector, setIsSelector] = useState(false);
  const [lentStatus, setLentStatus] = useState(book.lentStatus);
  const [userNotes, setUserNotes] = useState(book.userNotes);

  function editHandler() {
    setIsSelector(!isSelector);
  }

  function updateForm(event) {
    const fieldName = event.target.name;
    let fieldValue = event.target.value;

    if (event.target.type === 'checkbox') {
      fieldValue = event.target.checked;
      if (event.target.checked === false)
        return setLentStatus({
          [fieldName]: fieldValue,
          lentTo: '',
          lentDate: '',
        });
    }

    fieldName.includes('notes')
      ? setUserNotes(fieldValue)
      : setLentStatus({ ...lentStatus, [fieldName]: fieldValue });
  }

  function handleSubmit(event) {
    event.preventDefault();
    onAddLentStatusAndNotes(book, lentStatus, userNotes);
    onRemoveDetailView();
    toast.success('Successfully updated your book!');
  }

  return (
    <>
      {isSelector && (
        <ShelfEditor
          shelves={shelves}
          book={book}
          onSetIsSelector={setIsSelector}
          onSelectShelf={onSelectShelf}
        />
      )}
      <DetailsCard isStatic={isStatic} data-test-id="book-details">
        <CloseButton
          src={CloseIcon}
          alt="Close Icon"
          onClick={onRemoveDetailView}
        />
        <BookInformation>
          <BookImageWrapper>
            <img
              src={book.volumeInfo?.imageLinks?.thumbnail}
              alt={book.volumeInfo?.title || 'Book Cover'}
              width="121"
              height="192"
            />
            <UnreadReadButton
              onToggleBookIsRead={() => onToogleBookIsRead(book)}
              bookIsRead={bookIsRead(book)}
            />
          </BookImageWrapper>

          <BookSpecs>
            <BookTitle>{book.volumeInfo?.title}</BookTitle>
            {book.volumeInfo.subtitle && (
              <BookSubTitle>{book.volumeInfo.subtitle}</BookSubTitle>
            )}
            <p>{book.volumeInfo?.authors?.[0]}</p>
            <p>Released in {book.volumeInfo?.publishedDate?.substring(0, 4)}</p>
            <p>ISBN: {book.volumeInfo?.industryIdentifiers[0]?.identifier}</p>
          </BookSpecs>
        </BookInformation>
        <BookSettings>
          <RatingWrapper>
            <p>Rating: </p>
            <RatingStarWrapper>
              <BookRating
                onAddRating={onAddRating}
                book={book}
                onGetBookRating={onGetBookRating}
              />
            </RatingStarWrapper>
          </RatingWrapper>
          <LocationWrapper>
            <p>Location:</p>
            <div>
              <p>{onGetBookLocation(book)}</p>
              <img
                src={EditPencil}
                alt="Edit Location"
                onClick={() => editHandler(book)}
              />
            </div>
          </LocationWrapper>
          <form onSubmit={handleSubmit}>
            <LentWrapper>
              <p>Lent:</p>
              <div>
                <input
                  type="checkbox"
                  name="isLent"
                  onChange={updateForm}
                  checked={lentStatus.isLent}
                  value={lentStatus.isLent}
                />{' '}
                <input
                  type="name"
                  name="lentTo"
                  placeholder="Lent To:"
                  disabled={!lentStatus.isLent}
                  onChange={updateForm}
                  value={lentStatus.lentTo}
                />
                <input
                  type="date"
                  name="lentDate"
                  disabled={!lentStatus.isLent}
                  onChange={updateForm}
                  value={lentStatus.lentDate}
                />
              </div>
            </LentWrapper>
            <NotesWrapper>
              <p>Notes:</p>
              <div>
                <textarea
                  placeholder="Your notes"
                  onChange={updateForm}
                  value={userNotes}
                  name="notes"
                />
              </div>
            </NotesWrapper>
            {(userNotes !== book.userNotes ||
              lentStatus !== book.lentStatus) && <button>SAVE</button>}
          </form>
        </BookSettings>
      </DetailsCard>
    </>
  );
}

const DetailsCard = styled.article`
  background-color: var(--background);
  border-radius: var(--border-radius);
  box-shadow: ${(props) =>
    props.isStatic
      ? 'var(--box-shadow-offset-x) var(--box-shadow-offset-y) var(--box-shadow-blur) var(--box-shadow-color);'
      : '0 0 100px 100px rgba(0, 0, 0, 0.5)'};
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  height: ${(props) => (props.isStatic ? '650px' : '')};
  margin: ${(props) => (props.isStatic ? '0 auto' : '50vh 50vw')};
  opacity: 0.95;
  padding: 1rem;
  position: ${(props) => (props.isStatic ? 'relative' : 'fixed')};
  transform: ${(props) => (props.isStatic ? '' : 'translate(-50%, -65%)')};
  width: ${(props) => (props.isStatic ? '338px' : '90vw')};
  z-index: 101;

  form {
    button {
      background: var(--tertiary);
      color: var(--background);
      border: none;
      border-radius: var(--border-radius);
      height: 30px;
      margin-top: 1rem;
      padding: 0.32rem 0.5rem 0.3rem 0.5rem;
      width: 100%;
    }
  }
`;

const CloseButton = styled.img`
  position: absolute;
  right: -10px;
  top: -10px;
`;

const BookInformation = styled.section`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
`;

const BookImageWrapper = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 100%;
  justify-content: flex-start;
  width: 40%;

  img {
    box-shadow: var(--box-shadow-offset-x) var(--box-shadow-offset-y)
      var(--box-shadow-blur) var(--box-shadow-color);
    width: 102px;
    height: 154px;
  }
`;

const BookSpecs = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-start;
  width: 60%;

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
  margin: 0;
  margin-top: 0.3rem;
  max-height: 2rem;
  overflow: hidden;
`;

const BookSettings = styled.section`
  input:not([type='checkbox']),
  textarea {
    background: white;
    border: none;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow-offset-x) var(--box-shadow-offset-y)
      var(--box-shadow-blur) var(--box-shadow-color);
  }
`;

const RatingWrapper = styled.section`
  margin-top: 1rem;
`;

const RatingStarWrapper = styled.div`
  margin-top: 0.5rem;
`;

const LocationWrapper = styled.section`
  margin-top: 1rem;

  div {
    display: flex;
    align-items: center;
    margin-top: 0.5rem;
    gap: 0.5rem;
  }
`;

const LentWrapper = styled.section`
  margin-top: 1rem;

  div {
    align-items: center;
    display: flex;
    gap: 0.5rem;
    justify-content: space-between;
    margin-top: 0.5rem;
    width: 100%;

    input {
      height: 1.5rem;
    }
    input[type='checkbox'] {
      transform: scale(1.5);
    }
    input[type='name'] {
      width: 9rem;
    }
    input[type='date'] {
      font-family: sans-serif;
    }
    input:disabled {
      background: lightgrey;
    }
  }
`;

const NotesWrapper = styled.section`
  margin-top: 1rem;

  div {
    margin-top: 0.5rem;

    textarea {
      height: 3rem;
      resize: none;
      width: 100%;
    }
  }
`;

BookDetails.propTypes = {
  book: PropTypes.object,
  onRemoveDetailView: PropTypes.func,
  onAddRating: PropTypes.func,
  onGetBookLocation: PropTypes.func,
  onSelectShelf: PropTypes.func,
  shelves: PropTypes.array,
  onToogleBookIsRead: PropTypes.func,
  bookIsRead: PropTypes.func,
  onAddLentStatusAndNotes: PropTypes.func,
  onGetBookRating: PropTypes.func,
};
