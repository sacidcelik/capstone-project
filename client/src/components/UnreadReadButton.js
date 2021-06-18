import styled from 'styled-components';

export default function UnreadReadButton({ isRead, onToggleRead }) {
  return (
    <ToggleButton
      data-testid="unread-read-button"
      onClick={onToggleRead}
      isRead={isRead}
    >
      {isRead ? 'Read' : 'Unread'}
    </ToggleButton>
  );
}

const ToggleButton = styled.button`
  background: ${(props) =>
    props.isRead ? 'var(--tertiary)' : 'var(--primary)'};
  color: ${(props) => (props.isRead ? 'var(--background)' : 'black')};
  border: none;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow-offset-x) var(--box-shadow-offset-y)
    var(--box-shadow-blur) var(--box-shadow-color);
  font-size: 1.2rem;
  height: 30px;
  padding: 0.32rem 0.5rem 0.3rem 0.5rem;
  width: 102px;
`;
