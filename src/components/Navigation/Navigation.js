import './Navigation.css';
import accountIcon from '../../images/account-icon.svg';
import { Link, useLocation } from 'react-router-dom';


function Navigation({ loggedIn }) {
    const { pathname } = useLocation();
    const isLoginPage = pathname === '/signin' || pathname === '/signup';

    return (
        <article className='navigation'>
            {loggedIn && 
                <div className='navigation__autorize'>
                    <div className='navigation__films'>
                        <Link to='/movies' className='navigation__films-btn'>Фильмы</Link>
                        <Link to='/saved-movies' className='navigation__save-films-btn'>Сохранённые фильмы</Link>
                    </div>
                    <div className='navigation__navigate-account'>
                        <Link to='/profile' className='navigation__account-btn'>Аккаунт</Link>
                        <img className='navigation__account-logo' src={accountIcon} alt='Логотип аккаунта' />
                    </div>
                </div>
            }
            {(!isLoginPage || (!loggedIn && !isLoginPage)) &&
                <div className='navigation__links'>
                    <Link to='/signup' className='navigation__register-btn'>Регистрация</Link>
                    <Link to='/signin' className='navigation__login-btn'>Войти</Link>
                </div>
            }
        </article >
    )
}

export default Navigation;