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
        fieldValue.push({ column: i + 1 });
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

    /* shelf.columns.forEach((column) => {
      return column.height == value ? true : false;
    }); */
  }

  function shelfHeight(index) {
    let columnHeight = () => {
      if (checkForHeight(3)) return (100 / 3) * shelf.columns[index].height;
      if (checkForHeight(2)) return (100 / 2) * shelf.columns[index].height;
      else return (columnHeight = 100);
    };

    return columnHeight;
  }

  console.log(checkForHeight('3'));

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
              onChange={updateShelf}
            />
          </div>
          <div>
            <label htmlFor="columns">Columns</label>
            <select name="columns" id="columns" onChange={updateShelf}>
              <option value="">---Columns---</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div>
            <label htmlFor="color">Color</label>
            <select name="color" id="color" onChange={updateShelf}>
              <option value="">---Color---</option>
              <option value="black">Black</option>
              <option value="white">White</option>
              <option value="wood">Wood</option>
            </select>
          </div>
        </ShelfStarter>
        <ShelfConfigWrapper>
          {shelf.columns.map((column, index) => {
            return (
              <ShelfConfig key={index}>
                <p>{`Column ${shelf.columns[index].column}`}</p>
                <div>
                  <label htmlFor="width">Width</label>
                  <select
                    name="width"
                    id="width"
                    value={column.width}
                    onChange={(e) => updateColumn(e, index)}
                  >
                    <option value="0">-</option>
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
                    <option value="">-</option>
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
                    value={column.compartments && column.compartments.length}
                    onChange={(e) => updateColumn(e, index)}
                  >
                    <option value="">-</option>
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
              >
                {column.compartments &&
                  column.compartments.length > 0 &&
                  column.compartments.map((compartment, index) => {
                    return (
                      <Compartment key={'compartment' + index}>
                        <p>{index + 1}</p>
                      </Compartment>
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
  margin: 1rem auto 7rem;
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
  label {
    display: block;
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
  margin: 1rem auto;
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
  margin: 1rem auto;
  justify-content: center;
  align-items: flex-end;
  width: 90%;
  height: 200px;
  gap: 1px;
`;

const SubShelf = styled.div`
  height: ${(props) => props.shelfHeight}%;
  width: ${(props) => props.shelfWidth}%;
  border: 3px ridge red;
  margin: 0;
  display: flex;
  flex-direction: column;

  /*   :not(:first-child),
  :first-child {
    border-right: 0px solid red;
  }

  :last-child {
    border: 1px solid red;
  } */

  :nth-child(${(props) => props.child}) {
    width: ${(props) => props.shelfWidth}%;
    height: ${(props) => props.shelfHeight}%;
  }
`;

const Compartment = styled.div`
  width: 100%;
  border: 3px ridge red;
  border-left: none;
  border-right: none;
  height: 100%;

  :not(:first-child),
  :first-child {
    border-bottom: none;
  }

  :first-child {
    border-top: none;
  }
  :last-child {
    border-bottom: none;
  }
`;
