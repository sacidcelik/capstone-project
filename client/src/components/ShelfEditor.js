import PropTypes from 'prop-types';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useState } from 'react';

import CloseIcon from '../images/closeIcon.svg';
import SaveAddButton from './SaveAddButton';
import validateShelfSelection from '../lib/validateShelfSelection';

export default function ShelfEditor({
  isStatic,
  shelves,
  book,
  onSetIsSelector,
  onSelectShelf,
}) {
  const initialSelection = {
    bookshelfId: '',
    columnId: '',
    compartmentId: '',
  };
  const [selection, setSelection] = useState(initialSelection);
  const [shelfIndex, setShelfIndex] = useState(null);
  const [columnIndex, setColumnIndex] = useState(null);

  function handleBookShelfChange(event) {
    const shelfIndex = shelves.findIndex(
      (shelf) => shelf._id === event.target.value
    );
    shelfIndex >= 0 ? setShelfIndex(shelfIndex) : setShelfIndex(null);
    setSelection({
      ...selection,
      bookshelfId: event.target.value,
      columnId: '',
      compartmentId: '',
    });
    toast.dismiss('validationError');
  }

  function handleColumnChange(event) {
    const columnIndex = shelves[shelfIndex].columns.findIndex(
      (column) => column._id === event.target.value
    );
    columnIndex >= 0 ? setColumnIndex(columnIndex) : setColumnIndex(null);
    setSelection({
      ...selection,
      columnId: event.target.value,
      compartment: '',
    });
    toast.dismiss('validationError');
  }

  function handleCompartmentChange(event) {
    setSelection({ ...selection, compartmentId: event.target.value });
    toast.dismiss('validationError');
  }

  function handleSelectionSave(event) {
    event.preventDefault();
    if (validateShelfSelection(selection)) {
      onSelectShelf(selection, book);
      onSetIsSelector(false);
      toast.success('Book added to shelf!');
    } else {
      toast.error('Please choose a shelf, column and compartment', {
        toastId: 'validationError',
      });
    }
  }

  return (
    <ShelfSelectorCard isStatic={isStatic}>
      <h3>Set new location</h3>
      <CloseButton
        src={CloseIcon}
        alt="Close Icon"
        onClick={() => onSetIsSelector(false)}
      />
      <ShelfSelectorForm onSubmit={handleSelectionSave}>
        <ShelfPicker>
          <div>
            <label htmlFor="bookshelfId">Bookshelf</label>
            <select
              name="bookshelfId"
              id="bookshelfId"
              onChange={handleBookShelfChange}
              data-test-id="book-to-bookshelf-picker"
              value={selection.bookshelfId}
            >
              <option value="">-Select-</option>
              {shelves.length > 0 &&
                shelves.map((shelf, index) => (
                  <option key={shelf._id} value={shelf._id}>
                    {shelf.name}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label htmlFor="columnId">Column</label>
            <select
              name="columnId"
              id="columnId"
              onChange={handleColumnChange}
              data-test-id="book-to-column-picker"
              value={selection.columnId}
            >
              <option value="">-Select-</option>
              {shelfIndex !== null &&
                shelves[shelfIndex].columns.map((column) => (
                  <option key={column._id} value={column._id}>
                    {column.column}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label htmlFor="compartmentId">Compartment</label>
            <select
              name="compartmentId"
              id="compartmentId"
              value={selection.compartmentId}
              onChange={handleCompartmentChange}
              data-test-id="book-to-compartment-picker"
            >
              <option value="">-Select-</option>
              {shelfIndex !== null &&
                columnIndex !== null &&
                shelves[shelfIndex].columns[columnIndex].compartments.map(
                  (compartment) => (
                    <option key={compartment._id} value={compartment._id}>
                      {compartment.compartment}
                    </option>
                  )
                )}
            </select>
          </div>
        </ShelfPicker>
        <SaveAddButton text="SAVE" />
      </ShelfSelectorForm>
    </ShelfSelectorCard>
  );
}
const ShelfSelectorCard = styled.article`
  align-items: center;
  background-color: var(--background);
  border-radius: var(--border-radius);
  box-shadow: 0 0 100vw 100vh rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  height: ${(props) => (props.isStatic ? '350px' : '25vh')};
  justify-content: center;
  margin: ${(props) => (props.isStatic ? '0 auto' : '50vh 50vw')};
  opacity: 0.95;
  padding: 1rem;
  position: ${(props) => (props.isStatic ? 'relative' : 'fixed')};
  transform: ${(props) => (props.isStatic ? '' : 'translate(-50%, -100%)')};
  width: ${(props) => (props.isStatic ? '338px' : '80vw')};
  z-index: 10000;

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
  flex-direction: column;
  justify-content: space-around;
  margin: 1rem 0 1rem;
  width: 100%;

  button {
    align-self: center;
  }

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

ShelfEditor.propTypes = {
  shelves: PropTypes.array,
  book: PropTypes.object,
  onSetIsSelector: PropTypes.func,
  onSelectShelf: PropTypes.func,
};
