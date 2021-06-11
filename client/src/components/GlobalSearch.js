import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import SearchBar from './SearchBar';
import SearchResult from './SearchResult';

export default function GlobalSearch({ onAddToLibrary }) {
  const [query, setQuery] = useState('');
  const [searchedBooks, setSearchedBooks] = useState([]);
  const focusSearch = useRef(null);

  useEffect(() => {
    focusSearch.current.focus();
  }, []);

  const getBooks = async (query) => {
    if (query.length > 2) {
      const searchResults = await fetch('http://localhost:4000/searchAPI', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const bookData = await searchResults.json();
      return bookData.items;
    }
  };

  useEffect(() => {
    const sleep = (ms) => {
      return new Promise((resolve) => setTimeout(resolve, ms));
    };

    let currentQuery = true;
    const controller = new AbortController();

    const loadBooks = async () => {
      if (!query) return setSearchedBooks([]);
      await sleep(350);
      if (currentQuery) {
        const books = await getBooks(query, controller);
        books !== undefined && setSearchedBooks(books);
      }
    };
    loadBooks();

    return () => {
      currentQuery = false;
      controller.abort();
    };
  }, [query]);

  console.log(searchedBooks);

  return (
    <>
      <SearchBar query={query} setQuery={setQuery} focusSearch={focusSearch} />
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
