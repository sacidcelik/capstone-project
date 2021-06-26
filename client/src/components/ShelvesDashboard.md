```jsx
import { BrowserRouter as Router } from 'react-router-dom';

const shelves = [
  {
    id: '1232456',
    name: 'Living Room',
    color: 'wood',
    storedBooks: 24,
  },
  {
    id: '56875345',
    name: 'Office',
    color: 'black',
    storedBooks: 56,
  },
  {
    id: '767854123',
    name: 'Kitchen',
    color: 'white',
    storedBooks: 12,
  },
  {
    id: '256767343',
    name: 'NotVisible',
    color: 'white',
    storedBooks: 10,
  },
];

<Router>
  <ShelvesDashboard shelves={shelves} isStatic />
</Router>;
```
