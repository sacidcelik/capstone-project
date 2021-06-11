import NavFooter from './components/NavFooter';
import { Switch, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import MyShelves from './pages/MyShelves';
import MyBooks from './pages/MyBooks';

function App() {
  const [library, setLibrary] = useState([]);

  function addToLibrary(book) {
    setLibrary(book);
  }

  console.log('library', library);
  return (
    <>
      <Switch>
        <Route path="/home">
          <Home onAddToLibrary={addToLibrary} />
        </Route>
        <Route path="/myshelves">
          <MyShelves />
        </Route>
        <Route path="/mybooks">
          <MyBooks />
        </Route>
      </Switch>
      <NavFooter />
    </>
  );
}

export default App;
