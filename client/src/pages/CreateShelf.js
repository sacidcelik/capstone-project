import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom';
import { ReactComponent as BackArrow } from '../images/arrowBackward.svg';
import ShelfCreator from '../components/ShelfCreator';

export default function CreateShelf({ onSaveShelf }) {
  const history = useHistory();

  function handleRoute() {
    history.push('/myshelves');
  }

  return (
    <CreateShelfPage>
      <BackNav onClick={handleRoute}>
        <BackArrow /> <p>Back</p>
      </BackNav>
      <h3>Create New Shelf</h3>
      <ShelfCreator onSaveShelf={onSaveShelf} />
    </CreateShelfPage>
  );
}

const CreateShelfPage = styled.main`
  h3 {
    text-align: center;
  }
`;

const BackNav = styled.nav`
  display: flex;
  gap: 0.5rem;
  margin: 0 auto;
  width: 95%;
`;

CreateShelf.propTypes = {
  onSaveShelf: PropTypes.func,
};
