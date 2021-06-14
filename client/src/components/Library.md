```jsx
const library = [
  {
    volumeInfo: {
      title: 'Die Furcht des Weisen / Band 1',
      authors: ['Patrick Rothfuss'],
      imageLinks: {
        thumbnail:
          'http://books.google.com/books/content?id=sjDmcnAKAysC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      },
    },
  },
  {
    volumeInfo: {
      title: 'Harry Potter und der Stein der Weisen',
      authors: ['J.K. Rowling'],
      imageLinks: {
        thumbnail:
          'http://books.google.com/books/content?id=XtekEncdTZcC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      },
    },
  },
];

<Library library={library} isStatic />;
```
