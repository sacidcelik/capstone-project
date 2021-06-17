import Rating from 'react-rating';
import { ReactComponent as RatingStar } from '../images/ratingStar.svg';
import styled from 'styled-components/macro';

export default function BookRating({ onAddRating, book }) {
  return (
    <Rating
      emptySymbol={<RatingStar style={{ marginRight: '0.5rem' }} />}
      fullSymbol={<RatingStarFull style={{ marginRight: '0.5rem' }} />}
      initialRating={book.rating || 0}
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
