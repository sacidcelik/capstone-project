import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function UnreadReadButton({ bookIsRead, onToggleBookIsRead }) {
  return (
    <ToggleButton
      data-test-id="unread-read-button"
      onClick={onToggleBookIsRead}
      isRead={bookIsRead}
    >
      {bookIsRead ? 'READ' : 'UNREAD'}
    </ToggleButton>
  );
}

const ToggleButton = styled.button`
  color: ${(props) => (props.isRead ? 'var(--tertiary)' : 'var(--primary)')};
  border: ${(props) =>
    props.isRead ? '1px solid var(--tertiary)' : '1px solid var(--primary)'};
  border-radius: var(--border-radius);
  height: 30px;
  padding: 0.32rem 0.5rem 0.3rem 0.5rem;
  width: 102px;
`;

UnreadReadButton.propTypes = {
  bookIsRead: PropTypes.bool,
  onToggleBookIsRead: PropTypes.func,
};
