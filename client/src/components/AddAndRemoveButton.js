import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function AddAndRemoveButton({
  onToggleToAndFromLibrary,
  isInLibrary,
  onSetIsSelector,
  onProvideBook,
}) {
  function handleClick() {
    onToggleToAndFromLibrary();
    isInLibrary ? onSetIsSelector(false) : onSetIsSelector(true);
    onProvideBook();
  }

  return (
    <ToggleButton
      onClick={handleClick}
      data-test-id="add-and-remove-button"
      isInLibrary={isInLibrary}
    >
      {isInLibrary ? 'REMOVE' : 'ADD'}
    </ToggleButton>
  );
}

const ToggleButton = styled.button`
  background: ${(props) =>
    props.isInLibrary ? 'var(--logout-remove)' : 'var(--tertiary)'};
  color: var(--background);
  border: none;
  border-radius: var(--border-radius);
  font-size: 0.9rem;
  font-weight: 700;
  padding: 0.3rem 0.5rem 0.33rem 0.5rem;
  width: 80px;
`;

AddAndRemoveButton.propTypes = {
  onToggleToAndFromLibrary: PropTypes.func,
  isInLibrary: PropTypes.object,
};
