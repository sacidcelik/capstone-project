import GlobalSearch from '../components/GlobalSearch';
import PropTypes from 'prop-types';

export default function Home({ onToggleToAndFromLibrary, isInLibrary }) {
  return (
    <>
      <h2>Home</h2>
      <GlobalSearch
        onToggleToAndFromLibrary={onToggleToAndFromLibrary}
        isInLibrary={isInLibrary}
      />
    </>
  );
}

Home.propTypes = {
  onToggleToAndFromLibrary: PropTypes.func,
  isInLibrary: PropTypes.func,
};
