import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import getBooks from '../services/getDataFromAPI';
import Scanner from './Scanner';
import SearchBar from './SearchBar';
import SearchResult from './SearchResult';
import CloseIcon from '../images/closeIcon.svg';

export default function GlobalSearch({
  onToggleToAndFromLibrary,
  isInLibrary,
  shelves,
  onSelectShelf,
  placeholder,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [camera, setCamera] = useState(false);

  useEffect(() => {
    const sleep = (ms) => {
      return new Promise((resolve) => setTimeout(resolve, ms));
    };

    let currentQuery = true;
    const controller = new AbortController();

    const loadBooks = async () => {
      if (!searchQuery) return setSearchedBooks([]);
      await sleep(350);
      if (currentQuery) {
        const books = await getBooks(searchQuery, controller);
        books !== undefined && setSearchedBooks(books);
      }
    };
    loadBooks();

    return () => {
      currentQuery = false;
      controller.abort();
    };
  }, [searchQuery]);

  function onDetected(result) {
    setSearchQuery('isbn:' + result);
    setCamera(false);
  }

  function handleSearch(event) {
    setSearchQuery(event.target.value);
  }

  return (
    <GlobalSearchSection>
      <SearchBar
        query={searchQuery}
        onSearch={handleSearch}
        placeholder={placeholder}
        setSearchQuery={setSearchQuery}
        setCamera={setCamera}
        isGlobal
      />
      {camera && (
        <CameraSection>
          <p>Align your book's EAN barcode with the camera:</p>
          <CloseButton
            src={CloseIcon}
            alt="Close Icon"
            onClick={() => setCamera(false)}
          />
          <Scanner onDetected={onDetected} />
        </CameraSection>
      )}
      <SearchResult
        searchedBooks={searchedBooks}
        onToggleToAndFromLibrary={onToggleToAndFromLibrary}
        isInLibrary={isInLibrary}
        shelves={shelves}
        onSelectShelf={onSelectShelf}
      />
    </GlobalSearchSection>
  );
}

const GlobalSearchSection = styled.section`
  position: relative;
`;
const CameraSection = styled.section`
  align-items: center;
  background: var(--background);
  border-radius: var(--border-radius);
  box-shadow: 0 0 100px 100px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 300px;
  padding-top: 1rem;
  position: fixed;
  transform: translate(5%);
  width: 325px;
  z-index: 100;

  p {
    text-align: center;
  }
`;
const CloseButton = styled.img`
  position: absolute;
  right: -10px;
  top: -10px;
`;

GlobalSearch.propTypes = {
  onToggleToAndFromLibrary: PropTypes.func,
  isInLibrary: PropTypes.func,
  placeholder: PropTypes.string,
};
