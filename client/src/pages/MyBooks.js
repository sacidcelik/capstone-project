import { useState } from 'react';
import styled from 'styled-components';
import Library from '../components/Library';
import SearchBar from '../components/SearchBar';

export default function MyBooks({ library, onRenderBookDetails }) {
  const [libraryToDisplay, setLibraryToDisplay] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  function handleSearch(event) {
    let searchTerm = event.target.value;
    setSearchQuery(searchTerm);
    searchTerm = searchTerm.toLowerCase();
    console.log('term', searchTerm);
    if (searchTerm.length > 1) {
      const filteredLibrary = library.filter((book) => {
        return (
          book.volumeInfo.authors[0].toLowerCase().includes(searchTerm) ||
          book.volumeInfo.authors[1]?.toLowerCase().includes(searchTerm) ||
          book.volumeInfo.title.toLowerCase().includes(searchTerm) ||
          book.volumeInfo.publishedDate.includes(searchTerm)
        );
      });
      console.log('filtered', filteredLibrary);
      setLibraryToDisplay(filteredLibrary);
    } else {
      setLibraryToDisplay(library);
    }
  }

  return (
    <MyBooksPage>
      <h2>My Books</h2>

      <SearchBar
        placeholder="Search your library"
        query={searchQuery}
        onSearch={handleSearch}
      />

      <Library
        library={libraryToDisplay}
        onRenderBookDetails={onRenderBookDetails}
      />
    </MyBooksPage>
  );
}

const MyBooksPage = styled.main`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  width: 95%;
`;
