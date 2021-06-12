import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import SearchBar from './SearchBar';
import SearchResult from './SearchResult';
import getBooks from '../services/getDataFromAPI';

export default function GlobalSearch({ onAddToLibrary }) {
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
        onAddToLibrary={onAddToLibrary}
      />
    </>
  );
}
GlobalSearch.propTypes = {
  onAddToLibrary: PropTypes.func,
};
