import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

export default function GlobalSearch() {
  const [query, setQuery] = useState();
  const [searchedBooks, setSearchedBooks] = useState([]);
  const focusSearch = useRef(null);

  useEffect(() => {
    focusSearch.current.focus();
  }, []);

  const getBooks = async (query) => {
    const searchResults = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q={${query}}`
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

  const bookSearchResults = searchedBooks.map((book, index) => {
    return (
      <div key={index}>
        <img
          src={book.volumeInfo?.imageLinks?.thumbnail}
          width="128"
          height="199"
        />
        {book.volumeInfo.title}
      </div>
    );
  });

  console.log(query);
  console.log(searchedBooks);

  return (
    <>
      <form>
        <input
          type="text"
          placeholder="Search for your book"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          ref={focusSearch}
        />
      </form>
      <section>{bookSearchResults}</section>
    </>
  );
}
