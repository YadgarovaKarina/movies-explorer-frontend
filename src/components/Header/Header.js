import React from 'react';
import headerLogo from '../../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

function Header({ loggedIn, children, setIsNavtabOpen }) {
  const { pathname } = useLocation();

  return (
    <header className='header' style={{ backgroundColor: pathname === '/' ? '#073042' : '#202020' }}>
      <Link className='header__link' to="/">
        <img className='header__logo' src={headerLogo} alt='Логотип' />
      </Link>
      {children}
      {loggedIn &&
        <button className='header__navigate-btn' onClick = {() => setIsNavtabOpen(true)}/>
      }
    </header>
  );
}

export default Header;