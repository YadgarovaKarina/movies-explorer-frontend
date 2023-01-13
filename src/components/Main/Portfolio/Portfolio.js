import React from 'react';
import './Portfolio.css';

function Portfolio() {
    return (
        <article className='portfolio about-project'>
            <p className='portfolio__title'>Портфолио</p>
            <ul className='portfolio__list'>
                <li className='portfolio__argument'><a className='portfolio__website' href="https://yadgarovakarina.github.io/how-to-learn/" target='_blank' rel="noreferrer">Статичный сайт<span>↗</span></a></li>
                <li className='portfolio__argument'><a className='portfolio__website' href="https://yadgarovakarina.github.io/russian-travel/" target='_blank' rel="noreferrer">Адаптивный сайт<span>↗</span></a></li>
                <li className='portfolio__argument'><a className='portfolio__website' href="https://yadgarovak.nomoredomains.club/" target='_blank' rel="noreferrer">Одностраничное приложение<span>↗</span></a></li>
            </ul>
        </article>
    );
}

export default Portfolio;