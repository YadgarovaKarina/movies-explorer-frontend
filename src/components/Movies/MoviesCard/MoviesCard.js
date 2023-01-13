import './MoviesCard.css';
import { Switch, Route } from 'react-router-dom';


function MoviesCard({ card }) {
    const saveButton = card.saved ? (<button className='movie__save-btn'>Сохранить</button>) : (<button className='movie__save-btn_active' />);

    return (
        <li className="movie">
            <img className='movie__preview' src={card.thumbnail} alt='Картинка фильма' />
            <Switch>
                <Route path="/movies">
                    {saveButton}
                </Route>
                <Route path="/saved-movies">
                    <button className='saved__unsave-btn' />
                </Route>
            </Switch>
            <div className='movie__info'>
                <p className='movie__title'>{card.nameRU}</p>
                <p className='movie__time'>1ч 17м</p>
            </div>
        </li>
    );
}

export default MoviesCard;