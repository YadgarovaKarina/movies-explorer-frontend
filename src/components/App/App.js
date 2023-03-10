import './App.css';
import React from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { ApiMain } from '../../utils/MainApi.js';
import { defaultCurrentUser, CurrentUserContext } from '../../contexts/CurrentUserContext';
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
  const [loggedIn, setLoggedIn] = React.useState(true);
  const [isNavtabOpen, setIsNavtabOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(defaultCurrentUser);

  const history = useHistory();

  const handleLogin = (email, password) => {
    return ApiMain.authorize(email, password)
      .then((data) => {
        if (!data.token) throw new Error('Missing jwt');
        localStorage.setItem('jwt', data.token);
        setLoggedIn(true);
        history.push('/movies');
      })
      .catch((err) => err.message);
  };

  const handleLogout = () => {
    localStorage.clear();
    setCurrentUser(defaultCurrentUser);
    ApiMain.setToken('');
    history.push('/');
    setLoggedIn(false);
  };

  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    ApiMain.setToken(jwt);
    if (jwt) {
      ApiMain.getUserInfo()
        .then((user) => {
          if (user) {
            setLoggedIn(true);
            setCurrentUser(user);
          } else {
            setLoggedIn(false);
            history.push('/');
            handleLogout();
          }
        })
        .catch((err) => {
          handleLogout();
          console.log(err)
        });
    } else {
      setLoggedIn(false);
    }
  };

  React.useEffect(() => {
    tokenCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  const handleRegister = (name, email, password) => {
    return ApiMain.register(name, email, password)
      .then(() => ApiMain.authorize(email, password))
      .then((data) => {
        if (!data.token) throw new Error('Missing jwt');
        localStorage.setItem('jwt', data.token);
        ApiMain.setToken(data.token);
      })
      .then(() => ApiMain.getUserInfo())
      .then((user) => {
        if (user) {
          setLoggedIn(true);
          setCurrentUser(user);
          history.push('/movies');
        } else {
          handleLogout();
        }
      })
      .catch((err) => err.message);
  };

  function handleUpdateUser({ name, email }) {
    return ApiMain.editUserInfo(name, email)
      .then((onUpdateUser) => {
        setCurrentUser(onUpdateUser);
        return '';
      })
      .catch((err) => err.message);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
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
          name={currentUser.name}
          email={currentUser.email}
          onUpdateUser={handleUpdateUser}
          onLogout={handleLogout}
        />

        <Route path="/signin" >
          <ProtectedRoute
            component={Login}
            onLogin={handleLogin}
            loggedIn={!loggedIn} />
        </Route>

        <Route path="/signup">
          <ProtectedRoute
            component={Register}
            onRegister={handleRegister}
            loggedIn={!loggedIn} />
        </Route>

        <Route path="*" >
          <NotFound />
        </Route>

      </Switch>
      <Footer />
      <NavTab
        isOpen={isNavtabOpen}
        setIsNavtabOpen={setIsNavtabOpen} />

    </CurrentUserContext.Provider>
  );
}

export default App;
