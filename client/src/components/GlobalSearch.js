import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';

import getBooks from '../services/getDataFromAPI';
import SearchBar from './SearchBar';
import SearchResult from './SearchResult';

export default function GlobalSearch({
  onToggleToAndFromLibrary,
  isInLibrary,
  shelves,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedBooks, setSearchedBooks] = useState([]);
  const focusSearch = useRef(null);

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

  return (
    <>
      <SearchBar
        query={searchQuery}
        setSearchQuery={setSearchQuery}
        focusSearch={focusSearch}
      />
      <SearchResult
        searchedBooks={searchedBooks}
        onToggleToAndFromLibrary={onToggleToAndFromLibrary}
        isInLibrary={isInLibrary}
        shelves={shelves}
      />
    </>
  );
}
GlobalSearch.propTypes = {
  onToggleToAndFromLibrary: PropTypes.func,
  isInLibrary: PropTypes.func,
};
