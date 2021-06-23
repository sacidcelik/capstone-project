import PropTypes from 'prop-types';
import { Link, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components/macro';

import getShelfBorders from '../lib/shelfBorders';

export default function Shelf({
  shelf,
  onGetCompartmentBooks,
  onProvideDetailedShelf,
}) {
  let { url } = useRouteMatch();

  function shelfWidth(index) {
    const columnWidth =
      shelf.columns[index].width === undefined
        ? 100 / shelf.columns.length
        : (100 / shelf.columns.length) * shelf.columns[index].width;
    return columnWidth;
  }

  function checkForHeight(value) {
    return shelf.columns.some((column) => column.height === value);
  }

  function shelfHeight(index) {
    if (checkForHeight(3)) return (100 / 3) * shelf.columns[index].height;
    if (checkForHeight(2)) return (100 / 2) * shelf.columns[index].height;
    else return 100;
  }

  function compartmentClickHandler(shelf, column, compartment) {
    onGetCompartmentBooks(compartment.storedBooks);
    onProvideDetailedShelf(shelf, column, compartment);
  }

  return shelf.columns.map((column, index) => {
    return (
      <Column
        key={'column' + index}
        shelfWidth={shelfWidth(index)}
        shelfHeight={shelfHeight(index)}
        child={index}
        getColor={getShelfBorders(shelf.color)}
        data-test-id="column"
      >
        {column.compartments &&
          column.compartments.length > 0 &&
          column.compartments.map((compartment, index) => {
            return (
              <Compartment
                key={'compartment' + index}
                getColor={getShelfBorders(shelf.color)}
                data-test-id="compartment"
              >
                <Link
                  key={index}
                  to={`${url}/${compartment.id}`}
                  onClick={() =>
                    compartmentClickHandler(shelf, column, compartment)
                  }
                >
                  <p>CLICK ME</p>
                </Link>
              </Compartment>
            );
          })}
      </Column>
    );
  });
}

const Column = styled.div`
  border: ${(props) => props.getColor};
  display: flex;
  flex-direction: column;
  height: ${(props) => props.shelfHeight}%;
  margin: 0;
  width: ${(props) => props.shelfWidth}%;

  :nth-child(${(props) => props.child}) {
    height: ${(props) => props.shelfHeight}%;
    width: ${(props) => props.shelfWidth}%;
  }
`;

const Compartment = styled.div`
  border: ${(props) => props.getColor};
  border-left: none;
  border-right: none;
  height: 100%;
  width: 100%;

  :not(:first-child) {
    border-bottom: 3px solid var(--background);
  }

  :first-child {
    border-bottom: 3px solid var(--background);
    border-top: none;
  }
`;

Shelf.propTypes = {
  shelf: PropTypes.object,
};
