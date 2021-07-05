import PropTypes from 'prop-types';
import Rating from 'react-rating';
import styled from 'styled-components/macro';

import { ReactComponent as RatingStar } from '../images/ratingStar.svg';
export default function BookRating({ onAddRating, book, onGetBookRating }) {
  return (
    <Rating
      emptySymbol={<RatingStar style={{ marginRight: '0.5rem' }} />}
      fullSymbol={<RatingStarFull style={{ marginRight: '0.5rem' }} />}
      initialRating={onGetBookRating(book) || 0}
      onClick={(e) => onAddRating(e, book)}
    />
  );
}

const RatingStarFull = styled(RatingStar)`
  path {
    fill: var(--tertiary);
    stroke: none;
  }
`;

BookRating.propTypes = {
  onAddRating: PropTypes.func,
  book: PropTypes.object,
  onGetBookRating: PropTypes.func,
};
