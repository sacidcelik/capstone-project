function getUsers(func) {
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

function getActiveUserData(activeUser, funcShelves, funcLibrary) {
  fetch('/users/' + activeUser._id)
    .then((result) => result.json())
    .then((usersApi) => {
      funcShelves(Array.isArray(usersApi.shelves) ? usersApi.shelves : []);
      funcLibrary(Array.isArray(usersApi.library) ? usersApi.library : []);
    })
    .catch((error) => console.error('error', error));
}

function sendBook(activeUser, book, func) {
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
const sendUser = async (user) => {
  try {
    const results = await fetch('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    const savedUser = await results.json();
    return savedUser;
  } catch (error) {
    console.error(error.message);
  }
};

function sendShelf(activeUser, shelf, func) {
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

function updateRemoteLibrary(activeUser, booksArray, func) {
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

function updateRemoteShelves(activeUser, shelvesArray, func) {
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

export {
  getUsers,
  getActiveUserData,
  sendBook,
  sendUser,
  sendShelf,
  updateRemoteLibrary,
  updateRemoteShelves,
};
