import { useState } from 'react';
import styled from 'styled-components';

import SaveAddButton from './SaveAddButton';

export default function ShelfSelector({ shelves, book }) {
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
    setSelection({ ...selection, bookshelf: event.target.value, column: '' });
  }

  function handleColumnChange(event) {
    const columnIndex = shelves[shelfIndex].columns.findIndex(
      (column) => column.id === event.target.value
    );
    columnIndex >= 0 ? setColumnIndex(columnIndex) : setColumnIndex(null);
    setSelection({ ...selection, column: event.target.value, compartment: '' });
  }

  function handleCompartmentChange(event) {
    setSelection({ ...selection, compartment: event.target.value });
  }

  console.log(columnIndex);
  console.log(shelves);
  return (
    <ShelfSelectorCard>
      <ShelfPicker>
        <div>
          <label htmlFor="bookshelf">Bookshelf</label>
          <select
            name="bookshelf"
            id="bookshelf"
            onChange={handleBookShelfChange}
            value={selection.bookshelf}
          >
            <option value="">-Bookshelves-</option>
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
            <option value="">-Column-</option>
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
            <option value="">-Compartment-</option>
            {columnIndex !== null &&
              shelves[shelfIndex].columns[columnIndex].compartments.map(
                (compartment, index) => (
                  <option key={index} value={compartment.compartment}>
                    {compartment.compartment}
                  </option>
                )
              )}
          </select>
        </div>
      </ShelfPicker>
      <SaveAddButton text={'Save'} />
    </ShelfSelectorCard>
  );
}
const ShelfSelectorCard = styled.article`
  background-color: var(--background);
  border-radius: var(--border-radius);
  box-shadow: 0 0 80px 80px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  height: ${(props) => (props.isStatic ? '650px' : '20vh')};
  margin: ${(props) => (props.isStatic ? '0 auto' : '50vh 50vw')};
  opacity: 0.95;
  padding: 1rem;
  position: ${(props) => (props.isStatic ? 'relative' : 'fixed')};
  transform: ${(props) => (props.isStatic ? '' : 'translate(-50%, -180%)')};
  width: ${(props) => (props.isStatic ? '338px' : '80vw')};
  z-index: 100;

  input,
  select {
    border: 1px solid var(--primary);
    border-radius: var(--border-radius);
    background: var(--background);
  }
`;

const ShelfPicker = styled.section`
  display: flex;
  justify-content: space-around;
  margin: 1rem auto 2rem;
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
