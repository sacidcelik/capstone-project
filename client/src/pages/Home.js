import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom';
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
  onGrantAccess,
}) {
  const recentBooks =
    library.length > 3
      ? library?.slice(library.length - 3, library.length).reverse()
      : library.reverse();
  const history = useHistory();

  function handleLogout() {
    history.replace('/');
    onGrantAccess(false);
  }

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
      <LogoutButton onClick={handleLogout}>Log Out</LogoutButton>
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

const LogoutButton = styled.button`
  border: none;
  border-radius: var(--border-radius);
  background-color: #cc1c1c;
  color: var(--background);
  display: block;
  font-size: 1.5rem;
  height: 40px;
  margin: 1.5rem auto;
  width: 280px;
`;

Home.propTypes = {
  onToggleToAndFromLibrary: PropTypes.func,
  isInLibrary: PropTypes.func,
  shelves: PropTypes.array,
  onSelectShelf: PropTypes.func,
  library: PropTypes.array,
  onRenderBookDetails: PropTypes.func,
};
