import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

export default function StartLoginButton({ isStart, text }) {
  return <Button isStart={isStart}>{text}</Button>;
}

const Button = styled.button`
  border: none;
  border-radius: var(--border-radius);
  background-color: ${(props) =>
    props.isStart ? 'var(--primary)' : 'var(--secondary)'};
  color: ${(props) => (props.isStart ? 'black' : 'var(--background)')};
  font-size: 1.5rem;
  height: 40px;
  margin-bottom: 1rem;
  width: 280px;
`;

StartLoginButton.propTypes = {
  isStart: PropTypes.bool,
  text: PropTypes.string,
};
