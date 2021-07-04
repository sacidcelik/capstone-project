import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import getBooks from '../services/getDataFromAPI';
import Scanner from './Scanner';
import SearchBar from './SearchBar';
import SearchResult from './SearchResult';

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

  const focusSearch = useRef(null);

  function handleSearch(event) {
    setSearchQuery(event.target.value);
  }

  useEffect(() => {
    focusSearch.current.focus();
  }, []);

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
    setSearchQuery(result);
    setCamera(false);
  }

  return (
    <>
      <SearchBar
        query={searchQuery}
        onSearch={handleSearch}
        focusSearch={focusSearch}
        placeholder={placeholder}
        setSearchQuery={setSearchQuery}
        setCamera={setCamera}
      />
      {camera && (
        <CameraSection>
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
    </>
  );
}
const CameraSection = styled.section`
  height: 40vh;
  width: 80%;
`;

GlobalSearch.propTypes = {
  onToggleToAndFromLibrary: PropTypes.func,
  isInLibrary: PropTypes.func,
  placeholder: PropTypes.string,
};
