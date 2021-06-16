import styled from 'styled-components/macro';
import { useState } from 'react';

export default function ShelfCreator() {
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

  function shelfWidth(index) {
    const columnWidth =
      shelf.columns[index].width === undefined
        ? 100 / shelf.columns.length
        : (100 / shelf.columns.length) * shelf.columns[index].width;
    return columnWidth;
  }

  function checkForHeight(value) {
    return shelf.columns.some((column) => column.height === value);
  }

  function shelfHeight(index) {
    let columnHeight = () => {
      if (checkForHeight(3)) return (100 / 3) * shelf.columns[index].height;
      if (checkForHeight(2)) return (100 / 2) * shelf.columns[index].height;
      else return (columnHeight = 100);
    };

    return columnHeight;
  }

  function getShelfBorders(element) {
    const shelfBorders = {
      white: '3px ridge lightgrey',
      black: '3px ridge black',
      wood: '3px ridge #CD8500',
      default: '3px dotted red',
    };

    return shelfBorders[element]
      ? shelfBorders[element]
      : shelfBorders['default'];
  }

  console.log(shelf);

  return (
    <>
      <ShelfArea>
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
          {shelf.columns.map((column, index) => {
            return (
              <SubShelf
                key={'column' + index}
                shelfWidth={shelfWidth(index)}
                shelfHeight={shelfHeight(index)}
                child={index}
                getColor={getShelfBorders(shelf.color)}
                data-testid="sub-shelf"
              >
                {column.compartments &&
                  column.compartments.length > 0 &&
                  column.compartments.map((compartment, index) => {
                    return (
                      <Compartment
                        key={'compartment' + index}
                        getColor={getShelfBorders(shelf.color)}
                        data-testid="compartment"
                      />
                    );
                  })}
              </SubShelf>
            );
          })}
        </ShelfPreview>
      </ShelfArea>
    </>
  );
}

const ShelfArea = styled.section`
  width: 95%;

  margin: 1rem auto 9rem;
  height: 100%;
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
  width: 90%;
  margin: 1rem auto 2rem;
`;

const ShelfConfigHeader = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 1rem;

  p {
    font-size: 0.6rem;
  }
`;

const ShelfConfig = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0.5rem auto;
  padding: 0.5rem;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow-offset-x) var(--box-shadow-offset-y)
    var(--box-shadow-blur) var(--box-shadow-color);
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
  display: flex;
  gap: 1px;
  margin: 1rem auto;
  justify-content: center;
  align-items: flex-end;
  width: 90%;
  height: 150px;
`;

const SubShelf = styled.div`
  height: ${(props) => props.shelfHeight}%;
  width: ${(props) => props.shelfWidth}%;
  border: ${(props) => props.getColor};
  margin: 0;
  display: flex;
  flex-direction: column;

  :nth-child(${(props) => props.child}) {
    width: ${(props) => props.shelfWidth}%;
    height: ${(props) => props.shelfHeight}%;
  }
`;

const Compartment = styled.div`
  width: 100%;
  border: ${(props) => props.getColor};
  border-left: none;
  border-right: none;
  height: 100%;

  :not(:first-child) {
    border-bottom: 3px solid var(--background);
  }

  :first-child {
    border-top: none;
    border-bottom: 3px solid var(--background);
  }
`;
