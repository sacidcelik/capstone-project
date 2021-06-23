import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom';
import Compartment from '../components/Compartment';

import { ReactComponent as BackArrow } from '../images/arrowBackward.svg';

export default function CompartmentPage({
  onRenderBookDetails,
  onGetCompartmentBooks,
  onGetDetailedShelf,
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
      <Compartment
        onGetDetailedShelf={onGetDetailedShelf}
        onGetCompartmentBooks={onGetCompartmentBooks}
        onRenderBookDetails={onRenderBookDetails}
      />
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
