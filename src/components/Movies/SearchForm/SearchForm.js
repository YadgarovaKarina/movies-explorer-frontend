import './SearchForm.css';
import Search from '../../../images/find-3.svg';

function SearchForm() {
    return (
        <article className='movies__form-container'>
            <form className='movies__search-form'>
                <div className='movies__search'>
                    <input type='text' className='movies__search-input' placeholder='Фильм'></input>
                    <button className='movies__search-btn'><img className='movies__search-image' src={Search} alt='Кнопка поиска' /></button>
                </div>
                <span className="movies__input-error"></span>
                <div className='checkbox-container'>
                    <input className='movies__checkbox' type="checkbox" id='switch' />
                    <label className='movies__checkbox-label' htmlFor='switch' />
                    <label className='movies__checkbox-text' htmlFor='switch'>Короткометражки</label>
                </div>
            </form>
        </article>
    )
}

export default SearchForm;