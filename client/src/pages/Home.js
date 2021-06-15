import GlobalSearch from '../components/GlobalSearch';
import PropTypes from 'prop-types';

export default function Home({ onToggleToAndFromLibrary, isInLibrary }) {
  return (
    <main>
      <h2>Homey</h2>
      <GlobalSearch
        onToggleToAndFromLibrary={onToggleToAndFromLibrary}
        isInLibrary={isInLibrary}
      />
    </main>
  );
}

Home.propTypes = {
  onToggleToAndFromLibrary: PropTypes.func,
  isInLibrary: PropTypes.func,
};
