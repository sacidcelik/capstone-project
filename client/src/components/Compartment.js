import styled from 'styled-components/macro';

import Library from './Library';

export default function Compartment({
  onRenderBookDetails,
  onGetCompartmentBooks,
  onGetDetailedShelf,
}) {
  return (
    <CompartmentWrapper>
      <h2>{onGetDetailedShelf.shelf.name}</h2>
      <p>
        Column {onGetDetailedShelf.column.column} | Compartment{' '}
        {onGetDetailedShelf.compartment.compartment}
      </p>
      <Library
        library={onGetCompartmentBooks}
        onRenderBookDetails={onRenderBookDetails}
      />
    </CompartmentWrapper>
  );
}

const CompartmentWrapper = styled.section`
  margin: 1rem;
`;
