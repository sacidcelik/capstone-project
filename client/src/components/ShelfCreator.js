import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { toast } from 'react-toastify';
import { useState } from 'react';
import Shelf from './Shelf';
import SaveAddButton from './SaveAddButton';
import validateShelf from '../lib/validateShelf';

export default function ShelfCreator({ onSaveShelf }) {
  const initialShelf = {
    name: '',
    columns: [],
    color: '',
  };

  const [shelf, setShelf] = useState(initialShelf);

  function updateShelf(event) {
    const fieldName = event.target.name;
    let fieldValue = event.target.value;
    if (event.target.id === 'columns') {
      fieldValue = [];
      for (let i = 0; i < event.target.value; i++) {
        fieldValue.push({
          column: i + 1,
          compartments: [],
          width: 1,
          height: 1,
        });
      }
    }

    setShelf({ ...shelf, [fieldName]: fieldValue });
    toast.dismiss();
  }

  function updateColumn(event, index) {
    const fieldName = event.target.name;
    let fieldValue = Number(event.target.value);
    const newShelf = { ...shelf };
    if (event.target.id === 'compartments') {
      fieldValue = [];
      for (let i = 0; i < event.target.value; i++) {
        fieldValue.push({ compartment: i + 1 });
      }
    }
    newShelf.columns[index] = {
      ...newShelf.columns[index],
      [fieldName]: fieldValue,
    };
    setShelf(newShelf);
  }

  function handleShelfSave(event) {
    event.preventDefault();
    if (validateShelf(shelf)) {
      onSaveShelf(shelf);
      toast.success('Shelf Added!', {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      setShelf(initialShelf);
    } else {
      toast.error(
        'Please specifiy a name, the number of columns and a color.',
        {
          position: toast.POSITION.BOTTOM_CENTER,
          toastId: 'validationError',
        }
      );
    }
  }

  return (
    <ShelfArea onSubmit={handleShelfSave}>
      <ShelfStarter>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name your shelf"
            value={shelf.name}
            onChange={updateShelf}
          />
        </div>
        <div>
          <label htmlFor="columns">Columns</label>
          <select
            name="columns"
            id="columns"
            onChange={updateShelf}
            value={shelf.columns.length}
            data-testid="column-picker"
          >
            <option value="0">-Columns-</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div>
          <label htmlFor="color">Color</label>
          <select
            name="color"
            id="color"
            value={shelf.color}
            onChange={updateShelf}
            data-testid="color-picker"
          >
            <option value="">-Color-</option>
            <option value="black">Black</option>
            <option value="white">White</option>
            <option value="wood">Wood</option>
          </select>
        </div>
      </ShelfStarter>
      <ShelfConfigWrapper>
        {shelf.columns.length > 0 && (
          <ShelfConfigHeader>
            <p>Set Columns</p>
            <p>Width</p>
            <p>Height</p>
            <p>Compartments</p>
          </ShelfConfigHeader>
        )}
        {shelf.columns.map((column, index) => {
          return (
            <ShelfConfig key={index} data-testid="shelf-config">
              <p>{`Column ${shelf.columns[index].column}`}</p>
              <div>
                <label htmlFor="width">Width</label>
                <select
                  name="width"
                  id="width"
                  value={column.width}
                  onChange={(e) => updateColumn(e, index)}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
              <div>
                <label htmlFor="height">Height</label>
                <select
                  name="height"
                  id="height"
                  value={column.height}
                  onChange={(e) => updateColumn(e, index)}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
              <div>
                <label htmlFor="compartments">Compartments</label>
                <select
                  name="compartments"
                  id="compartments"
                  data-testid="compartment-picker"
                  value={column.compartments.length}
                  onChange={(e) => updateColumn(e, index)}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                </select>
              </div>
            </ShelfConfig>
          );
        })}
      </ShelfConfigWrapper>
      <ShelfPreview>
        <Shelf shelf={shelf} />
      </ShelfPreview>
      <SaveShelfButtonWrapper>
        {shelf.columns.length >= 1 && <SaveAddButton text={'Save Shelf'} />}
      </SaveShelfButtonWrapper>
    </ShelfArea>
  );
}

const ShelfArea = styled.form`
  height: 100%;
  margin: 1rem auto 9rem;
  width: 95%;

  input,
  select {
    border: 1px solid var(--primary);
    border-radius: var(--border-radius);
    background: var(--background);
  }
`;

const ShelfStarter = styled.section`
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

const ShelfConfigWrapper = styled.section`
  margin: 1rem auto 2rem;
  width: 90%;
`;

const ShelfConfigHeader = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-around;

  p {
    font-size: 0.6rem;
  }
`;

const ShelfConfig = styled.div`
  align-items: center;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow-offset-x) var(--box-shadow-offset-y)
    var(--box-shadow-blur) var(--box-shadow-color);
  display: flex;
  justify-content: space-around;
  margin: 0.5rem auto;
  padding: 0.5rem;
  width: 100%;

  p {
    font-size: 0.9rem;
  }

  label {
    display: block;
    font-size: 0.7rem;
    margin-bottom: 0.2rem;
  }

  :not(:first-child) {
    label {
      display: none;
    }
  }

  :nth-child(odd) {
    background: var(--primary);

    select {
      border-color: var(--secondary);
    }
  }
  :nth-child(even) {
    background: var(--secondary);
    color: var(--background);
  }

  select {
    height: 1.5rem;
    width: 3rem;
  }
`;

const ShelfPreview = styled.section`
  align-items: flex-end;
  display: flex;
  gap: 1px;
  justify-content: center;
  margin: 1rem auto;
  height: 150px;
  width: 90%;
`;

const SaveShelfButtonWrapper = styled.div`
  width: 95%;
  display: flex;
  justify-content: flex-end;
`;

ShelfCreator.propTypes = {
  onSaveShelf: PropTypes.func,
};
