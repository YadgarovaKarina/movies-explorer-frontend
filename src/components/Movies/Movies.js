import './Movies.css';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Preloader from './Preloader/Preloader';
import { ApiMovies } from '../../utils/MoviesApi';
import { ApiMain } from '../../utils/MainApi';
import React from 'react';

function Movies() {
  const [cards, setCards] = React.useState([]);
  const [filteredCards, setFilteredCards] = React.useState([]);

  const filterCards = (search) => {

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
      <div className='movies__preloader-container'>
        <Preloader />
      </div>
      <MoviesCardList cards={filteredCards} handleSaveCard={handleSaveCard} />
    </main>
  );
}

export default Movies;