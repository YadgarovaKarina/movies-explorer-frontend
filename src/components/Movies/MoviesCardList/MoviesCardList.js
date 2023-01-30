import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from 'react-router-dom';

function MoviesCardList({ cards, handleSaveCard, loadCards, loadMore }) {
    const { pathname } = useLocation();
    const isSavedFilmPage = pathname === '/saved-movies';

    return (
        <>
            <ul className='movies__container'>
                {cards.map((card) => <MoviesCard key={card.movieId}
                    card={card} handleSaveCard={handleSaveCard} />)}
                {cards.length === 0 &&
                    <li className='movies__container_span'>
                        <span className='movies__container_notFound'>Ничего не найдено</span></li>}
            </ul>
            {!isSavedFilmPage && loadMore &&
                <button className='movies__more-btn' onClick={loadCards}>Ещё</button>
            }
        </>
    );
}

export default MoviesCardList;
