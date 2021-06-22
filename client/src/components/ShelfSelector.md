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
const shelves = [
  {
    id: '3b2ae99d-0b5b-4e8b-9221-eab5f1634b9d',
    name: 'Shelf 1',
    columns: [
      {
        id: 'fb413524-8d1e-4cc4-a19e-5855e9696cf3',
        column: 1,
        compartments: [
          {
            compartment: 1,
            id: '1dc4d8be-db31-4d44-8561-ef39cfd349b5',
          },
          {
            compartment: 2,
            id: '17368c59-cf4f-4079-86f0-3425b1c60eb6',
          },
        ],
        width: 1,
        height: 2,
      },
      {
        id: '71fe7a93-c17c-4876-8298-b1f17dc73b36',
        column: 2,
        compartments: [
          {
            compartment: 1,
            id: '04bb1919-018e-45d6-8824-d4187503fbef',
          },
          {
            compartment: 2,
            id: '20ad9086-de95-44ac-b061-57a66b9b6c3f',
          },
          {
            compartment: 3,
            id: '9e37c70c-d1ff-4ac7-87c5-ed0fc7abc31e',
          },
        ],
        width: 1,
        height: 1,
      },
    ],
    color: 'white',
  },
];

<ShelfSelector
  isStatic
  book={book}
  shelves={shelves}
  onSetIsSelector={() => true}
  onSelectShelf={() => true}
/>;
```
