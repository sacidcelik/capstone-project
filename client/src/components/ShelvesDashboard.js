import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

export default function ShelvesDashboard({ shelves, isStatic }) {
  return (
    <Link to="/myshelves">
      <ShelvesCard isStatic={isStatic}>
        {shelves?.length === 0 && <h5>You have no saved shelves.</h5>}
        <ShelfList>
          {shelves &&
            shelves.map(
              (shelf, index) =>
                index < 3 && (
                  <Shelf key={shelf._id}>
                    {shelf.name}:{' '}
                    {shelf.storedBooks ? (
                      <span>
                        {shelf.storedBooks}
                        {shelf.storedBooks > 1 ? ' books' : ' book'}
                      </span>
                    ) : (
                      <span> 0 books</span>
                    )}
                  </Shelf>
                )
            )}
          {shelves.length > 3 && <p>+ {shelves.length - 3} more</p>}
        </ShelfList>
      </ShelvesCard>
    </Link>
  );
}

const ShelvesCard = styled.section`
  background: var(--secondary);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow-offset-x) var(--box-shadow-offset-y)
    var(--box-shadow-blur) var(--box-shadow-color);
  min-height: ${(props) => (props.isStatic ? '' : '20vh')};
  padding: 0.5rem;
  margin: 0 auto;
  width: ${(props) => (props.isStatic ? '375px' : '')};

  h5 {
    color: var(--background);
    text-align: center;
  }
`;

const ShelfList = styled.ol`
  color: var(--background);
  margin: 0;
  padding: 0;
`;

const Shelf = styled.li`
  margin: 0.5rem 1.2rem 1rem;
  padding: 0;

  span {
    font-style: italic;
  }
`;

ShelvesDashboard.propTypes = {
  shelves: PropTypes.array,
};
