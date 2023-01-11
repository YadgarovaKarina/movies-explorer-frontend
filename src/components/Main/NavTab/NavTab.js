import './NavTab.css';
import { Link } from 'react-router-dom';
import accountIcon from '../../../images/account-icon.svg';

function NavTab({ isOpen, setIsNavtabOpen }) {
  const className = `navTab__popup ${isOpen ? 'navTab__popup_opened' : ''}`;

  return (
    <div className={className}>
      <button type="button" className="navTab__close-button" onClick={() => setIsNavtabOpen(false)}></button>
      <div className='navTab__navigate'>
        <Link to='/' className='navTab__navigate-link' onClick={() => setIsNavtabOpen(false)}>Главная</Link>
        <Link to='/movies' className='navTab__navigate-link' onClick={() => setIsNavtabOpen(false)}>Фильмы</Link>
        <Link to='/saved-movies' className='navTab__navigate-link' onClick={() => setIsNavtabOpen(false)}>Сохраненные фильмы</Link>
      </div>
      <div className='navTab__account'>
        <Link to='/profile' className='navTab__account-btn' onClick={() => setIsNavtabOpen(false)}>Аккаунт</Link>
        <img className='navTab__account-logo' src={accountIcon} alt='Логотип аккаунта' />
      </div>
    </div>
  );
}

export default NavTab;