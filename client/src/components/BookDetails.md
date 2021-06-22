```jsx
const book = {
  rating: 1,
  volumeInfo: {
    title: 'Die Furcht des Weisen / Band 1',
    subtitle: 'Die Königsmörder-Chronik. Zweiter Tag',
    publishedDate: '2011-10-01',
    authors: ['Patrick Rothfuss'],
    imageLinks: {
      thumbnail:
        'http://books.google.com/books/content?id=sjDmcnAKAysC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    },
    industryIdentifiers: [{ identifier: '9783608102260' }],
  },
};

<BookDetails
  book={book}
  isStatic
  onAddRating={() => true}
  onGetBookLocation={() => true}
/>;
```
