import './NotFound.css';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <article className='error-page'>
            <div className='error-page__info'>
                <h6 className='error-page__title'>404</h6>
                <p className='error-page__subtitle'>Страница не найдена</p>
            </div>
            <Link to='/' className='error-page__button'>Назад</Link>
        </article>
    );
}

export default NotFound;