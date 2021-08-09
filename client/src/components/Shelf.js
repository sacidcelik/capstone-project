import { Link, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import styled from 'styled-components/macro';

import getShelfBorders from '../lib/shelfBorders';

export default function Shelf({
  shelf,
  onGetCompartmentBooks,
  onProvideDetailedShelf,
  isSaved,
  bookImages,
}) {
  const [compartmentDimensions, setCompartmentDimensions] = useState([]);
  let { url } = useRouteMatch();

  useEffect(() => {
    determineCompartmentRenderDimensions();
  }, [shelf]);

  function determineCompartmentRenderDimensions() {
    setCompartmentDimensions([]);
    const columns = document?.querySelectorAll('#column');
    const dimensions = [];

    columns.forEach((column, columnIndex) => {
      dimensions.push([]);
      column.childNodes.forEach((compartment) =>
        dimensions[columnIndex].push({
          height: compartment.clientHeight,
          width: compartment.clientWidth,
          fitsWidth: Math.floor(compartment.clientWidth / 50),
        })
      );
    });
    setCompartmentDimensions(dimensions);
  }

  function checkForHeight(value) {
    return shelf.columns.some((column) => column.height === value);
  }

  function shelfHeight(index) {
    if (checkForHeight(3)) return (100 / 3) * shelf.columns[index].height;
    if (checkForHeight(2)) return (100 / 2) * shelf.columns[index].height;
    else return 100;
  }

  function shelfWidth(index) {
    const columnWidth =
      shelf.columns[index].width === undefined
        ? 100 / shelf.columns.length
        : (100 / shelf.columns.length) * shelf.columns[index].width;
    return columnWidth;
  }

  function compartmentClickHandler(shelf, column, compartment) {
    onGetCompartmentBooks(compartment.storedBooks);
    onProvideDetailedShelf(shelf, column, compartment);
  }

  return shelf.columns.map((column, columnIndex) => {
    return (
      <Column
        key={'column' + columnIndex}
        shelfWidth={shelfWidth(columnIndex)}
        shelfHeight={shelfHeight(columnIndex)}
        child={columnIndex}
        getColor={getShelfBorders(shelf.color)}
        data-test-id="column"
        id="column"
      >
        {column.compartments &&
          column.compartments.length > 0 &&
          column.compartments.map((compartment, compartmentIndex) => {
            return (
              <Compartment
                key={'compartment' + compartmentIndex}
                getColor={getShelfBorders(shelf.color)}
                data-test-id="compartment"
              >
                {isSaved && (
                  <BookImageWrapper>
                    <LinkStyled
                      key={compartmentIndex}
                      to={`${url}/${compartment._id}`}
                      onClick={() =>
                        compartmentClickHandler(shelf, column, compartment)
                      }
                      data-test-id="compartment-link"
                    >
                      {compartmentDimensions?.[columnIndex]?.[compartmentIndex]
                        ?.height > 57 &&
                        compartmentDimensions?.[columnIndex]?.[compartmentIndex]
                          ?.fitsWidth > 0 &&
                        bookImages?.[columnIndex]?.[compartmentIndex]?.map(
                          (bookImageURL, bookImageIndex) => {
                            if (
                              bookImageIndex <
                              compartmentDimensions?.[columnIndex]?.[
                                compartmentIndex
                              ]?.fitsWidth
                            ) {
                              return (
                                <BookImage
                                  key={bookImageIndex}
                                  src={bookImageURL}
                                  alt="book cover"
                                  height={
                                    compartmentDimensions[columnIndex][
                                      compartmentIndex
                                    ].height - 10
                                  }
                                  width={
                                    (compartmentDimensions[columnIndex][
                                      compartmentIndex
                                    ].height -
                                      10) *
                                    0.63
                                  }
                                  propWidth={
                                    75 /
                                    compartmentDimensions[columnIndex][
                                      compartmentIndex
                                    ].fitsWidth
                                  }
                                />
                              );
                            }
                          }
                        )}
                      {compartmentDimensions?.[columnIndex]?.[compartmentIndex]
                        ?.height > 57 &&
                        compartment?.storedBooks?.length >
                          compartmentDimensions?.[columnIndex]?.[
                            compartmentIndex
                          ]?.fitsWidth && (
                          <BookCountBubble>
                            +
                            {compartment?.storedBooks?.length -
                              compartmentDimensions?.[columnIndex]?.[
                                compartmentIndex
                              ]?.fitsWidth}
                          </BookCountBubble>
                        )}
                      {(compartmentDimensions?.[columnIndex]?.[compartmentIndex]
                        ?.height <= 57 ||
                        compartmentDimensions?.[columnIndex]?.[compartmentIndex]
                          ?.fitsWidth === 0) && (
                        <p>
                          {compartment.storedBooks &&
                            compartment.storedBooks.length > 0 &&
                            compartment?.storedBooks?.length}
                        </p>
                      )}
                    </LinkStyled>
                  </BookImageWrapper>
                )}
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
  align-items: center;
  border: ${(props) => props.getColor};
  border-left: none;
  border-right: none;
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;

  :not(:first-child) {
    border-bottom: none;
  }

  :first-child {
    border-bottom: none;
    border-top: none;
  }
`;

const BookImageWrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: space-between;
  margin: 0 auto;
  width: 80%;
`;

const LinkStyled = styled(Link)`
  color: black;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  position: relative;
  text-decoration: none;
  width: 100%;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

const BookImage = styled.img`
  height: auto;
  object-fit: cover;
  width: ${(props) => props.propWidth}%;
`;
const BookCountBubble = styled.div`
  align-items: center;
  align-self: center;
  background-color: var(--secondary);
  border-radius: 50%;
  color: var(--background);
  display: flex;
  height: 3rem;
  justify-content: center;
  opacity: 0.8;
  position: absolute;
  right: 0;
  width: 3rem;
`;
Shelf.propTypes = {
  bookImages: PropTypes.array,
  isSaved: PropTypes.bool,
  onGetCompartmentBooks: PropTypes.func,
  onProvideDetailedShelf: PropTypes.func,
  shelf: PropTypes.object,
};
