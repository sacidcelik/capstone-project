import styled from 'styled-components';
import PropTypes from 'prop-types';

export default function SearchBar({ query, setQuery, focusSearch }) {
  return (
    <SearchWrapper>
      <SearchInput
        type="text"
        placeholder="Search for your book"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={focusSearch}
      />
    </SearchWrapper>
  );
}

const SearchWrapper = styled.div`
  width: 95%;
  height: 50px;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow-offset-x) var(--box-shadow-offset-y)
    var(--box-shadow-blur) var(--box-shadow-color);

  margin: 1rem auto;
  background: white;
  display: flex;
  padding-left: 1rem;
`;

const SearchInput = styled.input`
  border: none;
  display: inline;
  width: 80%;
  height: 50px;
  font-size: 1rem;

  :focus {
    outline: none;
  }
`;

SearchBar.propTypes = {
  query: PropTypes.string,
  setQuery: PropTypes.func,
  focusSearch: PropTypes.object,
};
