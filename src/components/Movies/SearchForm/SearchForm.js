import './SearchForm.css';
import Search from '../../../images/find-3.svg';
import React from 'react';

function SearchForm({ filterCards, required = true, page }) {
    const [isDisabledButton, setIsDisabledButton] = React.useState(true);
    const [error, setError] = React.useState({
        name: '',
        isShorts: '',
    });
    const [value, setValue] = React.useState({
        name: '',
        isShorts: false,
    });

    const formRef = React.useRef(null);

    React.useEffect(() => {
        const searchMovies = JSON.parse(localStorage.getItem('search-movies'));
        if (searchMovies) {
            setValue(searchMovies);
            filterCards(searchMovies);
        }
        if (page === 'saved-movies') {
            filterCards({ name: '', isShorts: false });
            setValue({ name: '', isShorts: false })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = (e) => {
        const {
            name,
            value: inputValue,
            validationMessage,
        } = e.target;
        const updatedValue = {
            ...value,
            [name]: inputValue
        }
        if (page === 'movies') {
            localStorage.setItem('search-movies', JSON.stringify(updatedValue));
        }
        setValue(updatedValue);
        setError((state) => ({
            ...state,
            [name]: validationMessage,
        })
        );
        setIsDisabledButton(!formRef.current.checkValidity());
    };

    const handleCheckbox = (e) => {
        const {
            name,
            checked
        } = e.target;
        const updatedValue = {
            ...value,
            [name]: checked
        }
        if (page === 'movies') {
            localStorage.setItem('search-movies', JSON.stringify(updatedValue));
        }
        setValue(updatedValue);
        filterCards(updatedValue);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        filterCards(value);
    }

    return (
        <article className='movies__form-container'>
            <form className='movies__search-form' onSubmit={handleSubmit} ref={formRef} noValidate>
                <div className='movies__search'>
                    <input type='text' name='name' className='movies__search-input' value={value.name} onChange={handleChange} placeholder='Фильм' required={required}></input>
                    <button className='movies__search-btn' disabled={isDisabledButton}><img className='movies__search-image' src={Search} alt='Кнопка поиска' /></button>
                </div>
                <span className="movies__input-error">{error.name}</span>
                <div className='checkbox-container'>
                    <input className='movies__checkbox' name='isShorts' checked={value.isShorts} onChange={handleCheckbox} type="checkbox" id='switch' />
                    <label className='movies__checkbox-label' htmlFor='switch' />
                    <label className='movies__checkbox-text' htmlFor='switch'>Короткометражки</label>
                </div>
            </form>
        </article>
    )
}

export default SearchForm;