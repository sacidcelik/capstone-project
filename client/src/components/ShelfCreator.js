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
      fieldValue = Array.from(
        { length: Number(event.target.value) },
        (_, i) => i + 1
      );
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
      <section>
        {shelf.subShelves.map((subShelf, index) => {
          return <SubShelf key={index} />;
        })}
      </section>
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
  width: 50px;
  border: 1px solid red;
`;
