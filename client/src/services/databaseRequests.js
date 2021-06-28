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
