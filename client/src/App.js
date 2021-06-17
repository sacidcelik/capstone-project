import NavFooter from './components/NavFooter';
import { Switch, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import MyShelves from './pages/MyShelves';
import MyBooks from './pages/MyBooks';
import Header from './components/Header';
import BookDetails from './components/BookDetails';

function App() {
  const [library, setLibrary] = useState([]);
  const [view, setView] = useState('');
  const [detailedBook, setDetailedBook] = useState({});

  console.log(detailedBook);

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
    return <BookDetails book={book} onRemoveDetailView={() => setView('')} />;
  }

  function renderBookDetailsHelper(book) {
    setDetailedBook(book);
    setView('details');
  }

  return (
    <>
      <Header />
      <Switch>
        <Route path="/home">
          <Home
            onToggleToAndFromLibrary={toggleToAndFromLibrary}
            isInLibrary={isInLibrary}
          />
        </Route>
        <Route path="/myshelves">
          <MyShelves />
        </Route>
        <Route path="/mybooks">
          {view === 'details' && renderBookDetails(detailedBook)}
          <MyBooks
            library={library}
            onRenderBookDetails={renderBookDetailsHelper}
          />
        </Route>
      </Switch>
      <NavFooter />
    </>
  );
}

export default App;
