import './Movies.css';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Preloader from './Preloader/Preloader';
import { ApiMain } from '../../utils/MainApi';
import React from 'react';

function SaverMovies() {
  const [cards, setCards] = React.useState([]);
  const [filteredCards, setFilteredCards] = React.useState([]);
  const [updateSearch, setUpdateSearch] = React.useState(false);
  const [isShowPreloader, setIsShowPreloader] = React.useState(false);
  const [searchFormWasInit, setSearchFormWasInit] = React.useState(false);

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    ApiMain.setToken(jwt);
    const savedMovies = JSON.parse(localStorage.getItem('saved-movies') || '[]');
    if (savedMovies.length === 0) {
      setIsShowPreloader(true);
      ApiMain.getMoviesCard()
        .then((serverCards) => {
          localStorage.setItem('saved-movies', JSON.stringify(serverCards.data));
          setCards(serverCards.data)
          setFilteredCards(serverCards.data);
          setIsShowPreloader(false);
        });
    } else {
      setCards(savedMovies)
      setFilteredCards(savedMovies)
      setUpdateSearch(true);
    }
  }, []);

  const filterCards = (search) => {
    setSearchFormWasInit(true);
    setFilteredCards(cards.filter((card) => {
      const isName = card.nameRU.toLowerCase().includes(search.name.toLowerCase());
      const isShorts = search.isShorts ? card.duration <= 40 : true;
      return isName && isShorts;
    }))
  }

  const handleSaveCard = (card) => {
    ApiMain.deleteCard(card._id)
      .then(() => {
        setFilteredCards((savedCards) => {
          const localMovies = JSON.parse(localStorage.getItem('local-movies') || '[]');
          const updatedLocalMovies = localMovies.map((movie) => {
            if (movie.id === card.movieId) {
              movie.saved = false;
            }
            return movie;
          })
          localStorage.setItem('local-movies', JSON.stringify(updatedLocalMovies));
          const filteredSavedCards = savedCards.filter(savedCard => savedCard._id !== card._id);
          localStorage.setItem('saved-movies', JSON.stringify(filteredSavedCards));
          return filteredSavedCards;
        })
      })
  }

  return (
    <main className='movies'>
      <SearchForm filterCards={filterCards} required={false} page='saved-movies' updateSearch={updateSearch} />
      {isShowPreloader &&
        <div className='movies__preloader-container'>
          <Preloader />
        </div>}
      <MoviesCardList
        cards={filteredCards}
        searchFormWasInit={searchFormWasInit}
        handleSaveCard={handleSaveCard} />
    </main>
  );
}

export default SaverMovies;
