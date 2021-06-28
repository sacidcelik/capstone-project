export function getUsers(func) {
  fetch('/users')
    .then((result) => result.json())
    .then((usersApi) => {
      const cleanUsersApi = usersApi.map((user) => {
        delete user.library;
        delete user.shelves;
        return user;
      });
      func(cleanUsersApi);
    })
    .catch((error) => console.error(error));
}

export function getActiveUserData(activeUser, funcShelves, funcLibrary) {
  fetch('/users/' + activeUser._id)
    .then((result) => result.json())
    .then((usersApi) => {
      funcShelves(usersApi.shelves);
      funcLibrary(usersApi.library);
    })
    .catch((error) => console.error('error', error));
}

export function sendBook(activeUser, book, func) {
  fetch('/users/library/' + activeUser._id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book),
  })
    .then((result) => result.json())
    .then((updatedUser) => {
      func(updatedUser.library);
    });
}

export function sendUser(user, array, func) {
  fetch('/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
    .then((result) => result.json)
    .then((savedUser) => func([...array, savedUser]))
    .catch((error) => alert('That did not work for some reason. Try again'));
}

export function sendShelf(activeUser, shelf, func) {
  fetch('/users/shelves/' + activeUser._id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(shelf),
  })
    .then((result) => result.json())
    .then((updatedUser) => {
      func(updatedUser.shelves);
    });
}

export function updateRemoteLibrary(activeUser, booksArray, func) {
  fetch('/users/libraryUpdate/' + activeUser._id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(booksArray),
  })
    .then((result) => result.json())
    .then((updatedUser) => {
      func(updatedUser.library);
    });
}

export function updateRemoteShelves(activeUser, shelvesArray, func) {
  fetch('/users/shelvesUpdate/' + activeUser._id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(shelvesArray),
  })
    .then((result) => result.json())
    .then((updatedUser) => {
      func(updatedUser.shelves);
    });
}
