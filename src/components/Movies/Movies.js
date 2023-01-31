import './Movies.css';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Preloader from './Preloader/Preloader';
import { ApiMovies } from '../../utils/MoviesApi';
import { ApiMain } from '../../utils/MainApi';
import React from 'react';

const calcCardCounter = () => {
  const counters = {
    start: 12,
    load: 3
  }
  if (window.innerWidth < 1196) {
    counters.start = 8;
    counters.load = 2;
  }
  if (window.innerWidth < 767) {
    counters.start = 5;
    counters.load = 1;
  }
  return counters;
}

function Movies() {
  const counters = calcCardCounter();
  const [cardsCounter, setCardsCounter] = React.useState(counters.start);
  const [cards, setCards] = React.useState([]);
  const [filteredCards, setFilteredCards] = React.useState([]);
  const [isShowPreloader, setIsShowPreloader] = React.useState(false);
  const [searchFormWasInit, setSearchFormWasInit] = React.useState(false);

  const loadCards = () => {
    const counters = calcCardCounter();
    setCardsCounter(cardsCounter + counters.load)
  }

  const filterCards = (search) => {
    setSearchFormWasInit(true);
    const filter = (cards) => {
      setFilteredCards(cards.filter((card) => {
        const isName = card.nameRU.toLowerCase().includes(search.name.toLowerCase());
        const isShorts = search.isShorts ? card.duration <= 40 : true;
        return isName && isShorts;
      }))
    }
    if (cards.length === 0) {
      const localMovies = JSON.parse(localStorage.getItem('local-movies') || '[]');
      if (localMovies.length === 0) {
        const jwt = localStorage.getItem('jwt');
        ApiMain.setToken(jwt);
        setIsShowPreloader(true);
        Promise.all([ApiMovies.getMoviesCard(), ApiMain.getMoviesCard()])
          .then(([beatCards, { data: myCards }]) => {
            const preparedCards = beatCards.map(card => {
              const myCard = myCards.find((myCard) => myCard.movieId === card.id);
              card._id = myCard !== undefined ? myCard._id : '';
              card.movieId = card.id;
              card.thumbnail = `https://api.nomoreparties.co/${card.image.url}`;
              card.saved = myCard !== undefined;
              return card;
            })
            setCards(preparedCards);
            filter(preparedCards);
            localStorage.setItem('local-movies', JSON.stringify(preparedCards));
            setIsShowPreloader(false);
          });
      } else {
        setCards(localMovies);
        filter(localMovies);
      }
    } else {
      filter(cards);
    }
  }

  const handleSaveCard = (card) => {
    if (card.saved) {
      ApiMain.deleteCard(card._id)
        .then(() => {
          setCards((beatCards) => {
            const updatedCards = beatCards.map(beatCard => {
              if (beatCard._id === card._id) {
                beatCard.saved = false;
              }
              return beatCard;
            })
            localStorage.setItem('local-movies', JSON.stringify(updatedCards));
            return updatedCards;
          })
          localStorage.removeItem('saved-movies');
        })
    } else {
      const newCard = {
        country: card.country,
        director: card.director,
        duration: card.duration,
        year: card.year,
        description: card.description,
        image: `https://api.nomoreparties.co/${card.image.url}`,
        trailerLink: card.trailerLink,
        thumbnail: `https://api.nomoreparties.co/${card.image.url}`,
        movieId: card.id,
        nameRU: card.nameRU,
        nameEN: card.nameEN,
      }
      ApiMain.saveCard(newCard)
        .then((serverCard) => {
          setCards((beatCards) => {
            localStorage.removeItem('saved-movies');
            const updatedCards = beatCards.map(beatCard => {
              if (beatCard.id === serverCard.movieId) {
                beatCard.saved = true;
                beatCard._id = serverCard._id;
                beatCard.movieId = serverCard.movieId;
                beatCard.thumbnail = serverCard.thumbnail;
              }
              return beatCard;
            })
            localStorage.setItem('local-movies', JSON.stringify(updatedCards));
            return updatedCards;
          })
        })
    }
  }

  return (
    <main className='movies'>
      <SearchForm filterCards={filterCards} page='movies' />
      {isShowPreloader &&
        <div className='movies__preloader-container'>
          <Preloader />
        </div>}
      <MoviesCardList
        cards={filteredCards.filter((_, i) => i < cardsCounter)}
        handleSaveCard={handleSaveCard}
        searchFormWasInit={searchFormWasInit}
        loadMore = {filteredCards.length > cardsCounter}
        loadCards={loadCards} />
    </main>
  );
}

export default Movies;