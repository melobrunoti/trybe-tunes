import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favoritos from './pages/Favorites';
import Login from './pages/Login';
import Search from './pages/Search';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';

class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/search" component={ Search } />
          <Route path="/album/:id" component={ Album } />
          <Route path="/favorites" component={ Favoritos } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="/profile" component={ Profile } />
          <Route path="/*" component={ NotFound } />

        </Switch>
      </HashRouter>
    );
  }
}

export default App;
