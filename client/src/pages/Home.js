import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Link, useHistory } from 'react-router-dom';
import GlobalSearch from '../components/GlobalSearch';
import LibraryDashboard from '../components/LibraryDashboard';
import ShelvesDashboard from '../components/ShelvesDashboard';

export default function Home({
  activeUser,
  isInLibrary,
  library,
  onGrantAccess,
  onLogout,
  onRenderBookDetails,
  onSelectShelf,
  onToggleToAndFromLibrary,
  shelves,
}) {
  const recentBooks =
    library.length > 3
      ? library.slice(library.length - 3, library.length).reverse()
      : library.slice().reverse();

  const history = useHistory();

  function handleLogout() {
    history.replace('/');
    onGrantAccess(false);
    onLogout();
  }

  return (
    <HomePage>
      <h2>
        {activeUser.name.charAt(activeUser.name.length - 1).toLowerCase() ===
        's'
          ? `${activeUser.name}' Library`
          : `${activeUser.name}'s Library`}
      </h2>
      <SectionHeadline>Add new book</SectionHeadline>
      <GlobalSearch
        onToggleToAndFromLibrary={onToggleToAndFromLibrary}
        isInLibrary={isInLibrary}
        shelves={shelves}
        onSelectShelf={onSelectShelf}
        placeholder="Search for title, author or any keyword"
      />
      <Link to="/myshelves">
        <SectionHeadline>My Bookshelves</SectionHeadline>{' '}
      </Link>
      <ShelvesDashboard shelves={shelves} />
      <Link to="/mybooks">
        <SectionHeadline>My Books</SectionHeadline>
      </Link>
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
    color: inherit;
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
  activeUser: PropTypes.object,
  isInLibrary: PropTypes.func,
  library: PropTypes.array,
  onGrantAccess: PropTypes.func,
  onLogout: PropTypes.func,
  onRenderBookDetails: PropTypes.func,
  onSelectShelf: PropTypes.func,
  onToggleToAndFromLibrary: PropTypes.func,
  shelves: PropTypes.array,
};
