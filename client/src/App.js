import NavFooter from './components/NavFooter';
import { Switch, Route } from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import CompartmentPage from './pages/CompartmentPage';
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
  const [detailedShelf, setDetailedShelf] = useState({
    compartment: { id: 123 },
  });
  const [detailedCompartmentBooks, setDetailedCompartmentBooks] = useState([]);

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

  function renderBookDetailsHelper(book) {
    setDetailedBook(book);
    setView('details');
  }

  function updateBook(property, value, bookToUpdate) {
    const updatedBooks = library.map((book) => {
      if (book.id === bookToUpdate.id) {
        book[property] = value;
      }
      return book;
    });
    setLibrary(updatedBooks);
  }

  function updateBooksInCompartment(property, selection, book) {
    const updatedShelves = shelves.map((shelf) => {
      if (shelf.id === selection.bookshelfId) {
        shelf.columns.map((column) => {
          if (column.id === selection.columnId) {
            column.compartments.map((compartment) => {
              if (compartment.id === selection.compartmentId) {
                let existingBooks;
                compartment[property]
                  ? (existingBooks = compartment[property])
                  : (existingBooks = []);
                existingBooks.length === 0
                  ? (compartment[property] = [book.id])
                  : (compartment[property] = [...existingBooks, book.id]);
              }
              return compartment;
            });
          }
          return column;
        });
      }
      return shelf;
    });
    setShelves(updatedShelves);
  }

  function addRating(rating, bookToUpdate) {
    updateBook('rating', rating, bookToUpdate);
  }

  function addShelf(shelf) {
    setShelves([...shelves, shelf]);
  }

  function addRefToBookAndShelf(location, bookToUpdate) {
    updateBook('shelfLocation', location, bookToUpdate);
    updateBooksInCompartment('storedBooks', location, bookToUpdate);
  }

  function getBookLocation(book) {
    if (book.shelfLocation) {
      const shelf = shelves.find(
        (shelf) => shelf.id === book.shelfLocation.bookshelfId
      );
      const column = shelf.columns.find(
        (column) => column.id === book.shelfLocation.columnId
      );
      const compartment = column.compartments.find(
        (compartment) => compartment.id === book.shelfLocation.compartmentId
      );
      return `${shelf.name}, Column ${column.column}, Compartment ${compartment.compartment}`;
    } else {
      return `Not stored in a shelf.`;
    }
  }

  function getCompartmentBooks(storedBookIds) {
    const storedBooks = [];
    if (storedBookIds && storedBookIds.length > 0) {
      storedBookIds.map((bookId) =>
        library.map((book) => {
          if (book.id === bookId) storedBooks.push(book);
          return storedBooks;
        })
      );
      return setDetailedCompartmentBooks(storedBooks);
    } else {
      return setDetailedCompartmentBooks([]);
    }
  }

  function provideDetailedShelfHelper(shelf, column, compartment) {
    const detailedShelfCompartment = {
      shelf: shelf,
      column: column,
      compartment: compartment,
    };
    setDetailedShelf(detailedShelfCompartment);
  }

  function renderBookDetails(book) {
    return (
      <BookDetails
        book={book}
        onRemoveDetailView={() => setView('')}
        onAddRating={addRating}
        onGetBookLocation={getBookLocation}
      />
    );
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
            onSelectShelf={addRefToBookAndShelf}
          />
        </Route>
        <Route exact path="/myshelves">
          <MyShelves
            onSaveShelf={addShelf}
            shelves={shelves}
            onGetCompartmentBooks={getCompartmentBooks}
            onProvideDetailedShelf={provideDetailedShelfHelper}
          />
        </Route>
        <Route path="/myshelves/createshelf">
          <CreateShelf onSaveShelf={addShelf} />
        </Route>
        <Route path={`/myshelves/${detailedShelf.compartment.id}`}>
          {view === 'details' && renderBookDetails(detailedBook)}
          <CompartmentPage
            onRenderBookDetails={renderBookDetailsHelper}
            detailedCompartmentBooks={detailedCompartmentBooks}
            detailedShelf={detailedShelf}
          />
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
const StyledToastContainer = styled(ToastContainer)`
  .Toastify__toast--success {
    background-color: var(--tertiary);
  }
`;

export default App;
