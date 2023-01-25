import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ cards, handleSaveCard }) {
    return (
        <>
            <ul className='movies__container'>
                {cards.map((card) => <MoviesCard key={card.movieId}
                    card={card} handleSaveCard={handleSaveCard}/>)}
            </ul>
            <button className='movies__more-btn'>Ещё</button>
        </>
    );
}

export default MoviesCardList;
