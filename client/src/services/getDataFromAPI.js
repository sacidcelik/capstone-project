const getBooks = async (searchQuery) => {
  if (searchQuery.length > 2) {
    const searchResults = await fetch('/searchAPI', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ searchQuery }),
    });
    const bookData = await searchResults.json();
    const books = await bookData.items;
    const httpsBooks = await books.map((book) => {
      book.volumeInfo.imageLinks.thumbnail =
        book.volumeInfo.imageLinks.thumbnail.replace(/^http:\/\//, 'https://');
      return book;
    });
    return httpsBooks;
  }
};

export default getBooks;
