import NavFooter from './components/NavFooter';
import { Switch, Route } from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import MyShelves from './pages/MyShelves';
import MyBooks from './pages/MyBooks';
import Header from './components/Header';
import BookDetails from './components/BookDetails';
import CreateShelf from './pages/CreateShelf';

function App() {
  const [library, setLibrary] = useState([]);
  const [shelves, setShelves] = useState([]);
  const [view, setView] = useState('');
  const [detailedBook, setDetailedBook] = useState({});

  function toggleToAndFromLibrary(focusedBook) {
    isInLibrary(focusedBook)
      ? removeFromLibrary(focusedBook)
      : addToLibrary(focusedBook);
  }

  function addToLibrary(focusedBook) {
    setLibrary([...library, focusedBook]);
  }

  function removeFromLibrary(focusedBook) {
    const remainingLibrary = library.filter(
      (book) => book.id !== focusedBook.id
    );
    setLibrary(remainingLibrary);
  }

  function isInLibrary(focusedBook) {
    return library.find((book) => book.id === focusedBook.id);
  }

  function renderBookDetails(book) {
    return (
      <BookDetails
        book={book}
        onRemoveDetailView={() => setView('')}
        onAddRating={addRating}
      />
    );
  }

  function renderBookDetailsHelper(book) {
    setDetailedBook(book);
    setView('details');
  }

  function updateBook(property, value, bookToUpdate) {
    const upDatedBooks = library.map((book) => {
      if (book.id === bookToUpdate.id) {
        book[property] = value;
      }
      return book;
    });
    setLibrary(upDatedBooks);
  }

  function addRating(rating, bookToUpdate) {
    updateBook('rating', rating, bookToUpdate);
  }

  function addShelf(shelf) {
    setShelves([...shelves, shelf]);
  }

  return (
    <>
      <StyledToastContainer />
      <Header />
      <Switch>
        <Route path="/home">
          <Home
            onToggleToAndFromLibrary={toggleToAndFromLibrary}
            isInLibrary={isInLibrary}
            shelves={shelves}
          />
        </Route>
        <Route exact path="/myshelves">
          <MyShelves onSaveShelf={addShelf} shelves={shelves} />
        </Route>
        <Route path="/mybooks">
          {view === 'details' && renderBookDetails(detailedBook)}
          <MyBooks
            library={library}
            onRenderBookDetails={renderBookDetailsHelper}
          />
        </Route>
        <Route path="/myshelves/createshelf">
          <CreateShelf onSaveShelf={addShelf} />
        </Route>
      </Switch>
      <NavFooter />
    </>
  );
}
const StyledToastContainer = styled(ToastContainer)`
  .Toastify__toast--success {
    background-color: var(--tertiary);
  }
`;

export default App;
