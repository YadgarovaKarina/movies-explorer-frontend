import './MoviesCard.css';
import { Switch, Route } from 'react-router-dom';


function MoviesCard({ card, handleSaveCard }) {

    const saveCard = () => handleSaveCard(card);
    const saveButton = card.saved ? (<button className='movie__save-btn_active' onClick={saveCard}/>) : (<button className='movie__save-btn' onClick={saveCard}>Сохранить</button>);

    const durationHours = card.duration >= 60 ? `${Math.floor(card.duration/60)} ч ` : '' ;
    const dirationMinutes = card.duration === 60 ? '' : `${card.duration % 60} м`;
    const duration = durationHours + dirationMinutes;

    return (
        <li className="movie">
            <a href={card.trailerLink} target='_blank' rel="noreferrer">
            <img className='movie__preview' src={card.thumbnail} alt='Картинка фильма' />
            </a>
            <Switch>
                <Route path="/movies">
                    {saveButton}
                </Route>
                <Route path="/saved-movies">
                    <button className='saved__unsave-btn' onClick={saveCard}/>
                </Route>
            </Switch>
            <div className='movie__info'>
                <p className='movie__title'>{card.nameRU}</p>
                <p className='movie__time'>{duration}</p>
            </div>
        </li>
    );
}

export default MoviesCard;