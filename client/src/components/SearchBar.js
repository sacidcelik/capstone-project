import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function SearchBar({ query, setSearchQuery, focusSearch }) {
  return (
    <SearchWrapper>
      <SearchInput
        type="text"
        placeholder="Search for your book"
        value={query}
        onChange={(e) => setSearchQuery(e.target.value)}
        ref={focusSearch}
        data-test-id="search-bar"
      />
    </SearchWrapper>
  );
}

const SearchWrapper = styled.div`
  height: 50px;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow-offset-x) var(--box-shadow-offset-y)
    var(--box-shadow-blur) var(--box-shadow-color);

  margin: 1rem auto;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchInput = styled.input`
  border: none;
  display: inline;
  font-size: 1rem;
  height: 46px;
  padding: 0 1rem;
  width: 99.9%;

  :focus {
    outline-color: var(--background);
  }
`;

SearchBar.propTypes = {
  query: PropTypes.string,
  setQuery: PropTypes.func,
  focusSearch: PropTypes.object,
};
