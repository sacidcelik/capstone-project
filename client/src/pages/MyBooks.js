import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Library from '../components/Library';
import SearchBar from '../components/SearchBar';

export default function MyBooks({ library, onRenderBookDetails }) {
  const [libraryToDisplay, setLibraryToDisplay] = useState(library);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (searchQuery !== '') {
      const filteredLibrary = library.filter((book) => {
        return (
          book.volumeInfo.authors
            .toString()
            .toLowerCase()
            .includes(searchQuery) ||
          book.volumeInfo.title.toLowerCase().includes(searchQuery) ||
          book.volumeInfo.publishedDate.includes(searchQuery)
        );
      });
      setLibraryToDisplay(filteredLibrary);
    } else {
      setLibraryToDisplay(library);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, library]);

  function handleSearch(event) {
    setSearchQuery(event.target.value.toLowerCase());
  }

  return (
    <MyBooksPage>
      <h2>My Books</h2>

      <SearchBar
        placeholder="Search my library"
        query={searchQuery}
        onSearch={handleSearch}
        setSearchQuery={setSearchQuery}
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

MyBooks.propTypes = {
  library: PropTypes.array,
  onRenderBookDetails: PropTypes.func,
};
