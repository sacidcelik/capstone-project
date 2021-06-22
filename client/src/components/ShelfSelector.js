import { useState } from 'react';
import styled from 'styled-components';

import SaveAddButton from './SaveAddButton';
import CloseIcon from '../images/closeIcon.svg';

export default function ShelfSelector({
  shelves,
  book,
  onSetIsSelector,
  onSelectShelf,
}) {
  const initialSelection = {
    bookshelf: '',
    column: '',
    compartment: '',
  };
  const [selection, setSelection] = useState(initialSelection);
  const [shelfIndex, setShelfIndex] = useState(null);
  const [columnIndex, setColumnIndex] = useState(null);
  function handleBookShelfChange(event) {
    const shelfIndex = shelves.findIndex(
      (shelf) => shelf.id === event.target.value
    );
    shelfIndex >= 0 ? setShelfIndex(shelfIndex) : setShelfIndex(null);
    setSelection({
      ...selection,
      bookshelf: event.target.value,
      column: '',
      compartment: '',
    });
  }

  console.log(selection);
  function handleColumnChange(event) {
    const columnIndex = shelves[shelfIndex].columns.findIndex(
      (column) => column.id === event.target.value
    );
    columnIndex >= 0 ? setColumnIndex(columnIndex) : setColumnIndex(null);
    setSelection({ ...selection, column: event.target.value, compartment: '' });
  }

  function handleCompartmentChange(event) {
    console.log(event.target.value);
    setSelection({ ...selection, compartment: event.target.value });
  }

  function handleSelectionSave(event) {
    event.preventDefault();
    onSelectShelf(selection, book);
    onSetIsSelector(false);
  }

  return (
    <ShelfSelectorCard>
      <CloseButton
        src={CloseIcon}
        alt="Close Icon"
        onClick={() => onSetIsSelector(false)}
      />
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
      <ShelfSelectorForm onSubmit={handleSelectionSave}>
        <ShelfPicker>
          <div>
            <label htmlFor="bookshelf">Bookshelf</label>
            <select
              name="bookshelf"
              id="bookshelf"
              onChange={handleBookShelfChange}
              value={selection.bookshelf}
            >
              <option value="">-Select-</option>
              {shelves.length > 0 &&
                shelves.map((shelf, index) => (
                  <option key={index} value={shelf.id}>
                    {shelf.name}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label htmlFor="column">Column</label>
            <select
              name="column"
              id="column"
              onChange={handleColumnChange}
              value={selection.column}
            >
              <option value="">-Select-</option>
              {shelfIndex !== null &&
                shelves[shelfIndex].columns.map((column, index) => (
                  <option key={index} value={column.id}>
                    {column.column}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label htmlFor="compartment">Compartment</label>
            <select
              name="compartment"
              id="compartment"
              value={selection.compartment}
              onChange={handleCompartmentChange}
            >
              <option value="">-Select-</option>
              {shelfIndex !== null &&
                columnIndex !== null &&
                shelves[shelfIndex].columns[columnIndex].compartments.map(
                  (compartment, index) => (
                    <option key={index} value={compartment.id}>
                      {compartment.compartment}
                    </option>
                  )
                )}
            </select>
          </div>
        </ShelfPicker>
        <SaveAddButton text={'Save'} />
      </ShelfSelectorForm>
    </ShelfSelectorCard>
  );
}
const ShelfSelectorCard = styled.article`
  align-items: center;
  background-color: var(--background);
  border-radius: var(--border-radius);
  box-shadow: 0 0 80px 80px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  height: ${(props) => (props.isStatic ? '650px' : '50vh')};
  justify-content: center;
  margin: ${(props) => (props.isStatic ? '0 auto' : '50vh 50vw')};
  opacity: 0.95;
  padding: 1rem;
  position: ${(props) => (props.isStatic ? 'relative' : 'fixed')};
  transform: ${(props) => (props.isStatic ? '' : 'translate(-50%, -100%)')};
  width: ${(props) => (props.isStatic ? '338px' : '90vw')};
  z-index: 100;

  input,
  select {
    border: 1px solid var(--primary);
    border-radius: var(--border-radius);
    background: var(--background);
  }
`;

const CloseButton = styled.img`
  position: absolute;
  right: -10px;
  top: -10px;
`;

const ShelfSelectorForm = styled.form`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  margin: 1rem 0 1rem;
  width: 100%;

  label {
    display: block;
    font-size: 0.8rem;
    margin-bottom: 0.2rem;
  }

  input,
  select {
    box-shadow: var(--box-shadow-offset-x) var(--box-shadow-offset-y)
      var(--box-shadow-blur) var(--box-shadow-color);
    height: 2rem;
  }
`;
const ShelfPicker = styled.section`
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
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
