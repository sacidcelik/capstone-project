import Rating from 'react-rating';
import { ReactComponent as RatingStar } from '../images/ratingStar.svg';
import styled from 'styled-components/macro';

export default function BookRating() {
  function handleRating(rate) {
    console.log(rate);
  }

  return (
    <Rating
      emptySymbol={<RatingStar style={{ marginRight: '0.5rem' }} />}
      fullSymbol={<RatingStarFull style={{ marginRight: '0.5rem' }} />}
      initialRating={0}
      onClick={handleRating}
    />
  );
}

const RatingStarFull = styled(RatingStar)`
  path {
    fill: var(--tertiary);
    stroke: none;
  }
`;
