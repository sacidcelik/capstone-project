import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function SaveAddButton({ text }) {
  return (
    <SaveButtonStyled data-test-id="save-add-button">{text}</SaveButtonStyled>
  );
}

const SaveButtonStyled = styled.button`
  background: var(--tertiary);
  color: var(--background);
  border: none;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow-offset-x) var(--box-shadow-offset-y)
    var(--box-shadow-blur) var(--box-shadow-color);
  font-size: 1rem;
  padding: 0.5rem 0.5rem 0.53rem 0.5rem;
  width: 95%;
`;

SaveAddButton.propTypes = {
  text: PropTypes.string,
};
