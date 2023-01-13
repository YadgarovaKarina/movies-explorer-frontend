import './Movies.css';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Preloader from './Preloader/Preloader';
import { cards } from '../../utils/constants'

function Movies() {
  return (
    <main className='movies'>
      <SearchForm />
      <div className='movies__preloader-container'>
        <Preloader />
      </div>
      <MoviesCardList cards={cards}/>
    </main>
  );
}

export default Movies;