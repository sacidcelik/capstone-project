import NavFooter from './components/NavFooter';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import MyShelves from './pages/MyShelves';
import MyBooks from './pages/MyBooks';

function App() {
  return (
    <div>
      <Switch>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/myshelves">
          <MyShelves />
        </Route>
        <Route path="/mybooks">
          <MyBooks />
        </Route>
      </Switch>
      <NavFooter />
    </div>
  );
}

export default App;
