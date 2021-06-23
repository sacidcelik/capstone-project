import styled from 'styled-components/macro';

import Library from './Library';

export default function Compartment({
  onRenderBookDetails,
  detailedCompartmentBooks,
  detailedShelf,
}) {
  return (
    <CompartmentWrapper>
      <h2>{detailedShelf.shelf.name}</h2>
      <p>
        Column {detailedShelf.column.column} | Compartment{' '}
        {detailedShelf.compartment.compartment}
      </p>
      <Library
        library={detailedCompartmentBooks}
        onRenderBookDetails={onRenderBookDetails}
      />
    </CompartmentWrapper>
  );
}

const CompartmentWrapper = styled.section`
  margin: 1rem;
`;
