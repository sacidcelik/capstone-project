import NavFooter from './components/NavFooter';
import { Switch, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
import getTodaysDate from './services/getDate';
import Start from './pages/Start';
import Access from './pages/Access';
import FirstShelf from './pages/FirstShelf';
import { saveToLocal, loadFromLocal } from './services/localStorage';
import {
  deleteRemoteBooksReference,
  getActiveUserData,
  getUsers,
  sendBook,
  sendShelf,
  sendUser,
  updateRemoteLibrary,
  updateRemoteShelves,
} from './services/databaseRequests';

function App() {
  const [activeUser, setActiveUser] = useState(
    loadFromLocal('activeUser') ?? {}
  );
  const [library, setLibrary] = useState(loadFromLocal('library') ?? []);
  const [shelves, setShelves] = useState(loadFromLocal('shelves') ?? []);
  const [users, setUsers] = useState([]);
  const [view, setView] = useState('');
  const [detailedBook, setDetailedBook] = useState({});
  const [detailedShelf, setDetailedShelf] = useState({
    compartment: { id: '' },
  });
  const [detailedCompartmentBooks, setDetailedCompartmentBooks] = useState([]);
  const [isNewUser, setIsNewUser] = useState(false);
  const [grantAccess, setGrantAccess] = useState(false);
  useEffect(() => {
    getUsers(setUsers);
  }, []);

  useEffect(() => {
    getActiveUserData(activeUser, setShelves, setLibrary);
  }, [activeUser]);

  useEffect(() => {
    saveToLocal('library', library);
  }, [library]);

  useEffect(() => {
    saveToLocal('shelves', shelves);
  }, [shelves]);

  useEffect(() => {
    saveToLocal('activeUser', activeUser);
  }, [activeUser]);

  function toggleToAndFromLibrary(focusedBook) {
    isInLibrary(focusedBook)
      ? removeFromLibrary(focusedBook)
      : addToLibrary(focusedBook);
  }

  function addToLibrary(focusedBook) {
    focusedBook.addToLibraryDate = getTodaysDate();
    sendBook(activeUser, focusedBook, setLibrary);
  }

  function addShelf(shelf) {
    sendShelf(activeUser, shelf, setShelves);
  }

  async function removeFromLibrary(focusedBook) {
    const bookWithObjectId = focusedBook._id
      ? focusedBook
      : await isInLibrary(focusedBook);
    const remainingLibrary = library.filter(
      (book) => book._id !== bookWithObjectId._id
    );
    updateRemoteLibrary(activeUser, remainingLibrary, setLibrary);
    if (
      bookWithObjectId.shelfLocation &&
      bookWithObjectId.shelfLocation.bookshelfId
    ) {
      const updatedUser = await deleteRemoteBooksReference(
        activeUser,
        bookWithObjectId
      );
      const updatedShelves = await updatedUser.shelves.map((shelf) =>
        countBooksInShelf(shelf)
      );
      updateRemoteShelves(activeUser, updatedShelves, setShelves);
    }
  }

  function addRefToBookAndShelf(location, bookToUpdate) {
    updateBooksInCompartment('storedBooks', location, bookToUpdate);
    updateBook('shelfLocation', location, bookToUpdate);
  }

  async function updateBooksInCompartment(property, selection, book) {
    const bookToAdd = isInLibrary(book);
    if (bookToAdd.shelfLocation && bookToAdd.shelfLocation.bookshelfId) {
      const updatedUser = await deleteRemoteBooksReference(
        activeUser,
        bookToAdd
      );
      const updatedShelves = await addBookReferenceToCompartment(
        property,
        selection,
        updatedUser.shelves,
        bookToAdd
      );
      updateRemoteShelves(activeUser, updatedShelves, setShelves);
    } else {
      const updatedShelves = addBookReferenceToCompartment(
        property,
        selection,
        shelves,
        bookToAdd
      );
      updateRemoteShelves(activeUser, updatedShelves, setShelves);
    }
  }

  function addBookReferenceToCompartment(
    property,
    selection,
    shelves,
    bookToAdd
  ) {
    shelves.map((shelf) => {
      if (shelf._id === selection.bookshelfId) {
        shelf.columns.map((column) => {
          if (column._id === selection.columnId) {
            column.compartments.map((compartment) => {
              if (compartment._id === selection.compartmentId) {
                let existingBooks;
                compartment[property]
                  ? (existingBooks = compartment[property])
                  : (existingBooks = []);
                existingBooks.length === 0
                  ? (compartment[property] = [{ id: bookToAdd._id }])
                  : (compartment[property] = [
                      ...existingBooks,
                      { id: bookToAdd._id },
                    ]);
              }
              return compartment;
            });
          }
          return column;
        });
      }
      return countBooksInShelf(shelf);
    });
    return shelves;
  }

  function countBooksInShelf(shelf) {
    shelf.storedBooks = 0;
    shelf.columns.forEach((column) =>
      column.compartments.forEach((compartment) => {
        const sum = compartment.storedBooks
          ? compartment.storedBooks.reduce((acc, element) => {
              if (element) acc++;
              return acc;
            }, 0)
          : 0;
        return (shelf.storedBooks += sum);
      })
    );
    return shelf;
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
    updateRemoteLibrary(activeUser, updatedBooks, setLibrary);
  }

  function addRating(rating, bookToUpdate) {
    updateBook('rating', rating, bookToUpdate);
  }

  function getBookLocation(book) {
    const updatedBook = isInLibrary(book);
    if (updatedBook.shelfLocation && updatedBook.shelfLocation.bookshelfId) {
      const shelf = shelves.find(
        (shelf) => shelf._id === updatedBook.shelfLocation.bookshelfId
      );
      const column = shelf.columns.find(
        (column) => column._id === updatedBook.shelfLocation.columnId
      );
      const compartment = column.compartments.find(
        (compartment) =>
          compartment._id === updatedBook.shelfLocation.compartmentId
      );
      return `${shelf.name}, Column ${column.column}, Compartment ${compartment.compartment}`;
    } else {
      return `Not stored in a shelf.`;
    }
  }

  function getCompartmentBooks(storedBookIds) {
    const storedBooks = [];
    if (storedBookIds && storedBookIds.length > 0) {
      storedBookIds.map((storedBook) =>
        library.map((book) => {
          if (book._id === storedBook.id) storedBooks.push(book);
          return storedBooks;
        })
      );
      return setDetailedCompartmentBooks(storedBooks);
    } else {
      return setDetailedCompartmentBooks([]);
    }
  }

  function getShelfBookImages(shelf) {
    const shelfBooks = [];
    if (shelf) {
      shelf.columns.forEach((column, columnIndex) => {
        shelfBooks.push([]);
        column.compartments.forEach((compartment) =>
          compartment.storedBooks
            ? shelfBooks[columnIndex].push([...compartment.storedBooks])
            : shelfBooks[columnIndex].push([])
        );
      });
      shelfBooks.map((columnBooks, shelfBooksColumnIndex) =>
        columnBooks.map((compartmentBooks, compartmentIndex) => {
          compartmentBooks.map((compartmentBook, bookIndex) =>
            library.map((book) => {
              if (book._id === compartmentBook.id) {
                shelfBooks[shelfBooksColumnIndex][compartmentIndex][bookIndex] =
                  book.volumeInfo?.imageLinks?.thumbnail;
                return shelfBooks;
              }
              return compartmentBooks;
            })
          );
          return columnBooks;
        })
      );
      return shelfBooks;
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

  async function getActiveUser(user) {
    if (isNewUser) {
      const newActiveUser = await sendUser(user);
      setActiveUser(newActiveUser);
    }
    if (!isNewUser) {
      const newActiveUser = await users.find(
        (existingUser) => existingUser.name === user.name
      );

      setActiveUser(newActiveUser);
    }
  }

  function handleAccess(user) {
    if (isNewUser) {
      return checkForUser(user)
        ? setGrantAccess(false)
        : (setGrantAccess(true), getActiveUser(user));
    }
    if (!isNewUser) {
      return checkForUser(user)
        ? (setGrantAccess(true), getActiveUser(user))
        : setGrantAccess(false);
    }
  }

  function getUsersOnLogout() {
    getUsers(setUsers);
  }

  function checkForUser(user) {
    if (user.name.length > 0)
      return users.some(
        (existingUser) =>
          existingUser.name.toLowerCase() === user.name.toLowerCase()
      );
  }

  function renderBookDetails(book) {
    return (
      <BookDetails
        book={book}
        onRemoveDetailView={() => setView('')}
        onAddRating={addRating}
        onGetBookLocation={getBookLocation}
        shelves={shelves}
        onSelectShelf={addRefToBookAndShelf}
      />
    );
  }

  return (
    <>
      <StyledToastContainer />

      <Switch>
        <Route exact path="/">
          <Start onSetIsNewUser={setIsNewUser} />
        </Route>
        <Route exact path="/accessPage">
          <Header noLink />
          <Access
            isNewUser={isNewUser}
            onHandleAccess={handleAccess}
            grantAccess={grantAccess}
            onCheckForUser={checkForUser}
          />
        </Route>
        <Route exact path="/firstShelf">
          <Header noLink />
          <FirstShelf
            onSaveShelf={addShelf}
            activeUser={activeUser}
            shelves={shelves}
          />
        </Route>
        <Route path="/home">
          <Header />
          {view === 'details' && renderBookDetails(detailedBook)}
          <Home
            onToggleToAndFromLibrary={toggleToAndFromLibrary}
            isInLibrary={isInLibrary}
            shelves={shelves}
            onSelectShelf={addRefToBookAndShelf}
            library={library}
            onRenderBookDetails={renderBookDetailsHelper}
            onGrantAccess={setGrantAccess}
            onLogout={getUsersOnLogout}
          />
          <NavFooter />
        </Route>
        <Route exact path="/myshelves">
          <Header />
          <MyShelves
            onSaveShelf={addShelf}
            shelves={shelves}
            onGetCompartmentBooks={getCompartmentBooks}
            onProvideDetailedShelf={provideDetailedShelfHelper}
            detailedCompartmentBooks={detailedCompartmentBooks}
            onGetShelfBooks={getShelfBookImages}
          />
          <NavFooter />
        </Route>
        <Route path="/myshelves/createshelf">
          <Header />
          <CreateShelf onSaveShelf={addShelf} />
          <NavFooter />
        </Route>
        <Route path={`/myshelves/${detailedShelf.compartment._id}`}>
          <Header />
          {view === 'details' && renderBookDetails(detailedBook)}
          <CompartmentPage
            onRenderBookDetails={renderBookDetailsHelper}
            detailedCompartmentBooks={detailedCompartmentBooks}
            detailedShelf={detailedShelf}
          />
          <NavFooter />
        </Route>
        <Route path="/mybooks">
          <Header />
          {view === 'details' && renderBookDetails(detailedBook)}
          <MyBooks
            library={library}
            onRenderBookDetails={renderBookDetailsHelper}
          />
          <NavFooter />
        </Route>
      </Switch>
    </>
  );
}
const StyledToastContainer = styled(ToastContainer)`
  .Toastify__toast--success {
    background-color: var(--tertiary);
  }
`;

export default App;
