import styled from 'styled-components/macro';
import { useState } from 'react';

export default function ShelfCreator() {
  const initialShelf = {
    name: '',
    subShelves: [],
    color: '',
  };

  const [shelf, setShelf] = useState(initialShelf);

  function updateShelf(event) {
    const fieldName = event.target.name;
    let fieldValue = event.target.value;
    if (event.target.id === 'subShelves') {
      fieldValue = [];
      for (let i = 0; i < event.target.value; i++) {
        fieldValue.push({ column: i + 1 });
      }
    }

    setShelf({ ...shelf, [fieldName]: fieldValue });
  }

  console.log(shelf.subShelves);

  return (
    <>
      <ShelfStarter>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" id="name" onChange={updateShelf} />
        </div>
        <div>
          <label htmlFor="subShelves">Shelves:</label>
          <select name="subShelves" id="subShelves" onChange={updateShelf}>
            <option value="">---Select---</option>
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
            <option value="">---Select---</option>
            <option value="black">Black</option>
            <option value="white">White</option>
            <option value="wood">Wood</option>
          </select>
        </div>
      </ShelfStarter>
      <ShelfConfigWrapper>
        {/*         <ShelfConfigHeader>
          <p>Width</p>
          <p>Height</p>
          <p>Compartments</p>
        </ShelfConfigHeader> */}
        {shelf.subShelves.map((subShelf, index) => {
          return (
            <ShelfConfig>
              <p>{`Column ${shelf.subShelves[index].column}`}</p>
              <div>
                <label htmlFor="width">Width</label>
                <select name="width" id="width" onChange={updateShelf}>
                  <option value="">-</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
              <div>
                <label htmlFor="height">Height</label>
                <select name="height" id="height" onChange={updateShelf}>
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
                  onChange={updateShelf}
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
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>
            </ShelfConfig>
          );
        })}
      </ShelfConfigWrapper>
      <ShelfPreview>
        {shelf.subShelves.map((subShelf, index) => {
          return <SubShelf key={index} />;
        })}
      </ShelfPreview>
    </>
  );
}

const ShelfStarter = styled.section`
  display: flex;
  justify-content: space-around;
  label {
    display: block;
  }
`;

const SubShelf = styled.div`
  height: 150px;
  width: 19%;
  border: 1px solid red;
  margin: 0;
`;

const ShelfConfigWrapper = styled.section`
  width: 90%;
  margin: 1rem auto;
`;

/* const ShelfConfigHeader = styled.div`
  grid-column: 2/-1;
  width: 90%;
  display: grid;
  grid-template-columns: auto repeat(3, 1fr);

  p:first-child {
    justify-self: center;
    grid-column: 2/3;
  }

  p:nth-child(2) {
    justify-self: center;
    grid-column: 3/4;
  }

  p:last-child {
    justify-self: center;
    grid-column: 4/5;
  }
`; */

const ShelfConfig = styled.div`
  width: 90%;
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
  }
  :nth-child(even) {
    background: var(--secondary);
    color: var(--background);
  }
`;

const ShelfPreview = styled.section`
  display: flex;
  margin: 1rem auto;
  justify-content: center;
  align-items: center;
`;
