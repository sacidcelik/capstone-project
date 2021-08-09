import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import CameraIcon from '../images/cameraIcon.svg';
import CloseIcon from '../images/closeIcon.svg';

export default function SearchBar({
  query,
  onSearch,
  placeholder,
  setSearchQuery,
  setCamera,
  isGlobal,
}) {
  function handleRemove(event) {
    if (event.key === 'Escape') {
      event.preventDefault();
      setSearchQuery('');
    }
  }

  return (
    <SearchWrapper>
      <SearchInput
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={onSearch}
        data-test-id="search-bar"
        onKeyDown={handleRemove}
      />
      {query !== '' && (
        <div onClick={() => setSearchQuery('')}>
          <img src={CloseIcon} alt="Clear Search Icon" width="20" height="20" />
        </div>
      )}
      {isGlobal && (
        <div onClick={() => setCamera((prevCamera) => !prevCamera)}>
          <img src={CameraIcon} alt="Scan Book Icon" width="20" height="20" />
        </div>
      )}
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
  width: 100%;

  div {
    height: 40%;
    display: flex;
    align-items: center;
    padding: 1rem;
  }

  img {
    cursor: pointer;
  }
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
  isGlobal: PropTypes.bool,
  onSearch: PropTypes.func,
  placeholder: PropTypes.string,
  query: PropTypes.string,
  setCamera: PropTypes.func,
  setSearchQuery: PropTypes.func,
};
