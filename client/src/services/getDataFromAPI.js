const getBooks = async (searchQuery) => {
  if (searchQuery.length > 2) {
    const searchResults = await fetch('http://localhost:4000/searchAPI', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ searchQuery }),
    });
    const bookData = await searchResults.json();
    return bookData.items;
  }
};

export default getBooks;
