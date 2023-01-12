import React from 'react';
import './Footer.css';
import { useLocation } from 'react-router-dom';

function Footer() {
    const { pathname } = useLocation();
    const isLoginPage = pathname === '/signin' || pathname === '/signup';

    return (
        (!isLoginPage) &&
            <footer className="footer">
                <p className='footer__text'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
                <div className='footer__info'>
                    <p className='footer__date'>&copy; 2022</p>
                    <ul className='footer__links'>
                        <li><a className='footer__link' href="https://practicum.yandex.ru/" target='_blank' rel="noreferrer">Яндекс.Практикум</a></li>
                        <li><a className='footer__link' href="https://github.com/YadgarovaKarina" target='_blank' rel="noreferrer">Github</a></li>
                    </ul>
                </div>
            </footer>
    );
}

export default Footer;