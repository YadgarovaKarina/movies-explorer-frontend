import './App.css';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Navigation from '../Navigation/Navigation'
import Main from '../Main/Main';
import Header from '../Header/Header';
import NavTab from '../Main/NavTab/NavTab';
import Movies from '../Movies/Movies';
import SavedMovies from '../Movies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../Not Found/NotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
  const [loggedIn] = React.useState(false); // true or false
  const [isNavtabOpen, setIsNavtabOpen] = React.useState(false);

  return (
    <>
      <Header
        loggedIn={loggedIn}
        setIsNavtabOpen={setIsNavtabOpen}>
        <Navigation loggedIn={loggedIn} />
      </Header>
      <Switch>

        <Route exact path='/'>
          <Main />
        </Route>

        <ProtectedRoute
          path="/movies"
          component={Movies}
          loggedIn={loggedIn}
        />

        <ProtectedRoute
          path="/saved-movies"
          component={SavedMovies}
          loggedIn={loggedIn}
        />

        <ProtectedRoute
          path="/profile"
          component={Profile}
          loggedIn={loggedIn}
        />

        <Route path="/signin">
          <Login />
        </Route>

        <Route path="/signup">
          <Register />
        </Route>

        <Route path="*">
          <NotFound />
        </Route>

      </Switch>
      <Footer />
      <NavTab
        isOpen={isNavtabOpen}
        setIsNavtabOpen={setIsNavtabOpen}
      />
    </>
  );
}

export default App;
