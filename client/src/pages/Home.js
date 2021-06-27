import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import GlobalSearch from '../components/GlobalSearch';
import LibraryDashboard from '../components/LibraryDashboard';
import ShelvesDashboard from '../components/ShelvesDashboard';

export default function Home({
  onToggleToAndFromLibrary,
  isInLibrary,
  shelves,
  onSelectShelf,
  library,
  onRenderBookDetails,
}) {
  let recentBooks = [];
  recentBooks = library?.slice(library.length - 3, library.length).reverse();
  return (
    <HomePage>
      <SectionHeadline>Add new book</SectionHeadline>
      <GlobalSearch
        onToggleToAndFromLibrary={onToggleToAndFromLibrary}
        isInLibrary={isInLibrary}
        shelves={shelves}
        onSelectShelf={onSelectShelf}
      />
      <SectionHeadline>My Bookshelves</SectionHeadline>
      <ShelvesDashboard shelves={shelves} />
      <SectionHeadline>My Library</SectionHeadline>
      <LibraryDashboard
        recentBooks={recentBooks}
        onRenderBookDetails={onRenderBookDetails}
      />
    </HomePage>
  );
}

const HomePage = styled.main`
  margin: 0 auto 7rem;
  width: 95%;
  a {
    text-decoration: none;
  }
`;

const SectionHeadline = styled.h4`
  margin: 1.5rem auto 1rem;
`;

Home.propTypes = {
  onToggleToAndFromLibrary: PropTypes.func,
  isInLibrary: PropTypes.func,
  shelves: PropTypes.array,
  onSelectShelf: PropTypes.func,
  library: PropTypes.array,
  onRenderBookDetails: PropTypes.func,
};
