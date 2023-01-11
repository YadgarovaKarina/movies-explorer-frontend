import React from 'react';
import './Portfolio.css';

function Portfolio() {
    return (
        <article className='portfolio about-project'>
            <p className='portfolio__title'>Портфолио</p>
            <ul className='portfolio__list'>
                <li className='portfolio__argument'>Статичный сайт<a className='portfolio__website' href="https://yadgarovakarina.github.io/how-to-learn/" target='_blank' rel="noreferrer">↗</a></li>
                <li className='portfolio__argument'>Адаптивный сайт<a className='portfolio__website' href="https://yadgarovakarina.github.io/russian-travel/" target='_blank' rel="noreferrer">↗</a></li>
                <li className='portfolio__argument'>Одностраничное приложение<a className='portfolio__website' href="https://yadgarovak.nomoredomains.club/" target='_blank' rel="noreferrer">↗</a></li>
            </ul>
        </article>
    );
}

export default Portfolio;