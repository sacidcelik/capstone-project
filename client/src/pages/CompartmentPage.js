import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom';

import Library from '../components/Library';
import { ReactComponent as BackArrow } from '../images/arrowBackward.svg';

export default function CompartmentPage({
  onRenderBookDetails,
  detailedCompartmentBooks,
  detailedShelf,
}) {
  const history = useHistory();

  function handleRoute() {
    history.push('/myshelves');
  }
  return (
    <CompartmentPageWrapper>
      <BackNav onClick={handleRoute} data-test-id="back-to-shelves">
        <BackArrow /> <p>Back</p>
      </BackNav>
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
    </CompartmentPageWrapper>
  );
}

const CompartmentPageWrapper = styled.main``;

const BackNav = styled.nav`
  display: flex;
  gap: 0.5rem;
  margin: 0 auto;
  width: 95%;
`;

const CompartmentWrapper = styled.section`
  margin: 1rem;
`;
CompartmentPage.propTypes = {
  onRenderBookDetails: PropTypes.func,
  detailedCompartmentBooks: PropTypes.array,
  detailedShelf: PropTypes.object,
};
