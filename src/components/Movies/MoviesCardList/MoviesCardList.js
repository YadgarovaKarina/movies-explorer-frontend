import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ cards }) {
    return (
        <>
            <ul className='movies__container'>
                {cards.map((card) => <MoviesCard key={card.id}
                    card={card} />)}
            </ul>
            <button className='movies__more-btn'>Ещё</button>
        </>
    );
}

export default MoviesCardList;
