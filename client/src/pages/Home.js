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
  activeUser,
}) {
  const recentBooks =
    library.length > 3
      ? library.slice(library.length - 3, library.length).reverse()
      : library.slice().reverse();

  const history = useHistory();

  function handleLogout() {
    history.replace('/');
    onGrantAccess(false);
  }

  return (
    <HomePage>
      <h2>
        {activeUser.name.charAt(activeUser.name.length - 1).toLowerCase() ===
        's'
          ? `${activeUser.name}' Library`
          : `${activeUser.name}'s Library`}
      </h2>
      <SectionHeadline>Add New Book</SectionHeadline>
      <GlobalSearch
        onToggleToAndFromLibrary={onToggleToAndFromLibrary}
        isInLibrary={isInLibrary}
        shelves={shelves}
        onSelectShelf={onSelectShelf}
        placeholder="Search for my book"
      />
      <SectionHeadline>My Bookshelves</SectionHeadline>
      <ShelvesDashboard shelves={shelves} />
      <SectionHeadline>My Library</SectionHeadline>
      <LibraryDashboard
        recentBooks={recentBooks}
        onRenderBookDetails={onRenderBookDetails}
      />
      <LogoutButton onClick={handleLogout}>LOG OUT</LogoutButton>
    </HomePage>
  );
}

const HomePage = styled.main`
  margin: 0 auto 7rem;
  width: 95%;
  h2 {
    text-align: center;
  }
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
  background-color: var(--logout-remove);
  color: var(--background);
  display: block;
  font-size: 1.1rem;
  font-weight: 700;
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
  activeUser: PropTypes.object,
};
