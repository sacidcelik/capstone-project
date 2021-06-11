import GlobalSearch from '../components/GlobalSearch';
import PropTypes from 'prop-types';

export default function Home({ onAddToLibrary }) {
  return (
    <>
      <h2>Home</h2>
      <GlobalSearch onAddToLibrary={onAddToLibrary} />
    </>
  );
}

Home.propTypes = {
  onAddToLibrary: PropTypes.func,
};
