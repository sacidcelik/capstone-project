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

function App() {
  const [activeUser, setActiveUser] = useState(
    loadFromLocal('activeUser') ?? {}
  );
  const [users, setUsers] = useState([]);
  const [library, setLibrary] = useState(loadFromLocal('library') ?? []);
  const [shelves, setShelves] = useState(loadFromLocal('shelves') ?? []);
  const [view, setView] = useState('');
  const [detailedBook, setDetailedBook] = useState({});
  const [detailedShelf, setDetailedShelf] = useState({
    compartment: { id: 123 },
  });
  const [detailedCompartmentBooks, setDetailedCompartmentBooks] = useState([]);
  const [isNewUser, setIsNewUser] = useState(false);
  const [grantAccess, setGrantAccess] = useState(false);
  console.log('users', users);
  console.log('activeUser', activeUser);
  console.log('shelves', shelves);
  useEffect(() => {
    saveToLocal('library', library);
  }, [library]);

  console.log('library', library);

  useEffect(() => {
    fetch('/users')
      .then((result) => result.json())
      .then((usersApi) => setUsers(usersApi))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    fetch('/users/shelves/' + activeUser._id)
      .then((result) => result.json())
      .then((usersApi) => setShelves(usersApi.shelves))
      .catch((error) => console.error(error));
  }, [activeUser]);

  useEffect(() => {
    fetch('/users/library/' + activeUser._id)
      .then((result) => result.json())
      .then((usersApi) => setLibrary(usersApi.library))
      .catch((error) => console.error(error));
  }, [activeUser]);

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
    console.log(focusedBook);
    fetch('/users/library/' + activeUser._id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(focusedBook),
    })
      .then((result) => result.json())
      .then((updatedUser) => {
        setLibrary(updatedUser.library);
      });
  }

  function addShelf(shelf) {
    fetch('/users/shelves/' + activeUser._id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(shelf),
    })
      .then((result) => result.json())
      .then((updatedUser) => {
        setShelves(updatedUser.shelves);
      });
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

  function findBookInLibrary(book) {
    return library.find((existingBook) => existingBook.id === book.id);
  }

  async function updateBooksInCompartment(property, selection, book) {
    const bookToAdd = await findBookInLibrary(book);
    const updatedShelves = await shelves.map((shelf) => {
      if (shelf._id === selection.bookshelfId) {
        shelf.columns.map((column) => {
          if (column._id === selection.columnId) {
            column.compartments.map((compartment) => {
              if (compartment._id === selection.compartmentId) {
                console.log('selection', selection.compartmentId);
                console.log('column', compartment._id);
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
    });
    console.log('updatedShelves', updatedShelves);
    fetch('/users/shelvesUpdate/' + activeUser._id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedShelves),
    })
      .then((result) => result.json())
      .then((updatedUser) => {
        setShelves(updatedUser.shelves);
      });
  }

  function addRating(rating, bookToUpdate) {
    updateBook('rating', rating, bookToUpdate);
  }

  function addRefToBookAndShelf(location, bookToUpdate) {
    updateBook('shelfLocation', location, bookToUpdate);
    updateBooksInCompartment('storedBooks', location, bookToUpdate);
  }

  function getBookLocation(book) {
    if (book.shelfLocation) {
      const shelf = shelves.find(
        (shelf) => shelf._id === book.shelfLocation.bookshelfId
      );
      const column = shelf.columns.find(
        (column) => column._id === book.shelfLocation.columnId
      );
      const compartment = column.compartments.find(
        (compartment) => compartment._id === book.shelfLocation.compartmentId
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
          if (book._id === bookId) storedBooks.push(book);
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
          compartmentBooks.map((bookId, bookIndex) =>
            library.map((book) => {
              if (book._id === bookId) {
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

  function addUser(user) {
    fetch('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
      .then((result) => result.json)
      .then((savedUser) => setUsers([...users, savedUser]))
      .catch((error) => alert('That did not work for some reason. Try again'));
  }

  function getActiveUser(user) {
    const activeUser = users.find(
      (existingUser) =>
        existingUser.name.toLowerCase() === user.name.toLowerCase()
    );
    return activeUser;
  }

  function handleAccess(user) {
    if (isNewUser) {
      return checkForUser(user)
        ? setGrantAccess(false)
        : (addUser(user),
          setGrantAccess(true),
          setActiveUser(getActiveUser(user)));
    }
    if (!isNewUser) {
      return checkForUser(user)
        ? (setGrantAccess(true), setActiveUser(getActiveUser(user)))
        : setGrantAccess(false);
    }
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
        <Route path={`/myshelves/${detailedShelf.compartment.id}`}>
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
