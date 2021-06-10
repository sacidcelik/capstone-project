import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
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

  /*   const bookSearchResults = searchedBooks.map((book, index) => {
    return (
      <div key={index}>
        <img
          src={book.volumeInfo?.imageLinks?.thumbnail}
          width="128"
          height="199"
          alt={book.volumeInfo.title || 'Book Cover'}
        />
        <p>{book.volumeInfo.title}</p>
      </div>
    );
  }); */

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
      <SearchResultSection>
        {searchedBooks.map((book, index) => (
          <SearchResult book={book} index={index} />
        ))}
      </SearchResultSection>
    </>
  );
}

const SearchResultSection = styled.section`
  padding-bottom: 7rem;
`;
