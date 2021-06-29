```jsx
import { BrowserRouter as Router } from 'react-router-dom';

const recentBooks = [
  {
    id: 'Qe_gwgcppYoC',
    volumeInfo: {
      title: 'Die Protokolle der Weisen von Zion',
      imageLinks: {
        smallThumbnail:
          'http://books.google.com/books/content?id=Qe_gwgcppYoC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
        thumbnail:
          'http://books.google.com/books/content?id=Qe_gwgcppYoC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      },
    },
    addToLibraryDate: '26.06.2021',
  },
  {
    id: 'XtekEncdTZcC',
    volumeInfo: {
      title: 'Harry Potter und der Stein der Weisen',
      imageLinks: {
        smallThumbnail:
          'http://books.google.com/books/content?id=XtekEncdTZcC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
        thumbnail:
          'http://books.google.com/books/content?id=XtekEncdTZcC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      },
    },
    addToLibraryDate: '26.06.2021',
  },
  {
    id: 'sjDmcnAKAysC',
    volumeInfo: {
      title: 'Die Furcht des Weisen / Band 1',
      imageLinks: {
        smallThumbnail:
          'http://books.google.com/books/content?id=sjDmcnAKAysC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
        thumbnail:
          'http://books.google.com/books/content?id=sjDmcnAKAysC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      },
    },
    addToLibraryDate: '26.06.2021',
  },
];

<Router>
  <LibraryDashboard
    recentBooks={recentBooks}
    onRenderBookDetails={() => true}
    isStatic
  />
</Router>;
```
