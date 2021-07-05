import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Library from '../components/Library';
import SearchBar from '../components/SearchBar';

export default function MyBooks({ library, onRenderBookDetails }) {
  const [libraryToDisplay, setLibraryToDisplay] = useState(library);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredView, setFilteredView] = useState('');

  useEffect(() => {
    if (searchQuery !== '') {
      const filteredLibrary = library.filter((book) => {
        return (
          book.volumeInfo.authors
            .toString()
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          book.volumeInfo.title
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          book.volumeInfo.publishedDate.includes(searchQuery.toLowerCase())
        );
      });
      setLibraryToDisplay(filteredLibrary);
      setFilteredView('Search');
    } else {
      setLibraryToDisplay(library);
      setFilteredView('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, library]);

  function handleSearch(event) {
    setSearchQuery(event.target.value);
  }

  function filterForUnread() {
    if (filteredView !== 'Unread') {
      const filteredLibrary = library.filter((book) => !book.readStatus.isRead);
      setLibraryToDisplay(filteredLibrary);
      setFilteredView('Unread');
    } else {
      setLibraryToDisplay(library);
      setFilteredView('');
    }
  }

  function filterForFavorites() {
    if (filteredView !== 'Favorites') {
      const filteredLibrary = library.filter((book) => book.rating >= 4);
      setLibraryToDisplay(filteredLibrary);
      setFilteredView('Favorites');
    } else {
      setLibraryToDisplay(library);
      setFilteredView('');
    }
  }

  function filterForLent() {
    if (filteredView !== 'Lent') {
      const filteredLibrary = library.filter((book) => book.lentStatus.isLent);
      setLibraryToDisplay(filteredLibrary);
      setFilteredView('Lent');
    } else {
      setLibraryToDisplay(library);
      setFilteredView('');
    }
  }

  return (
    <MyBooksPage>
      <h2>My Books</h2>

      <SearchBar
        placeholder="Browse in my books"
        query={searchQuery}
        onSearch={handleSearch}
        setSearchQuery={setSearchQuery}
      />
      <FilterButtonWrapper>
        <FilterButton
          isActive={filteredView === 'Unread'}
          onClick={filterForUnread}
        >
          UNREAD
        </FilterButton>
        <FilterButton
          isActive={filteredView === 'Favorites'}
          onClick={filterForFavorites}
        >
          FAVORITES
        </FilterButton>
        <FilterButton
          isActive={filteredView === 'Lent'}
          onClick={filterForLent}
        >
          LENT
        </FilterButton>
      </FilterButtonWrapper>
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

const FilterButtonWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const FilterButton = styled.button`
  background-color: ${(props) =>
    props.isActive ? 'var(--primary)' : 'var(--secondary)'};
  border: none;
  border-radius: var(--border-radius);
  color: ${(props) => (props.isActive ? 'black' : 'var(--background)')};
  padding: 0.32rem 0.5rem 0.3rem 0.5rem;
  width: 30%;
`;

MyBooks.propTypes = {
  library: PropTypes.array,
  onRenderBookDetails: PropTypes.func,
};
