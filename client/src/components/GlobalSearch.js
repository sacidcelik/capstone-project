import { useEffect, useRef, useState } from 'react';

import SearchBar from './SearchBar';
import SearchResult from './SearchResult';

export default function GlobalSearch() {
  const [query, setQuery] = useState('');
  const [searchedBooks, setSearchedBooks] = useState([]);
  const focusSearch = useRef(null);

  useEffect(() => {
    focusSearch.current.focus();
  }, []);

  const getBooks = async (query) => {
    const searchResults = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=40`
    );
    const bookData = await searchResults.json();
    return bookData.items;
  };

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  useEffect(() => {
    let currentQuery = true;
    const controller = new AbortController();

    const loadBooks = async () => {
      if (!query) return setSearchedBooks([]);

      await sleep(350);
      if (currentQuery) {
        const books = await getBooks(query, controller);
        setSearchedBooks(books);
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
      <SearchResult searchedBooks={searchedBooks} />
    </>
  );
}
