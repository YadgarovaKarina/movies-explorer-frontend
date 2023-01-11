import React from 'react';
import './Promo.css';
import promoFigure from '../../../images/figure.svg';

function Promo() {
    return (
        <article className='promo'>
            <section className='promo__section'>
                <p className='promo__section-text'>Учебный проект студента факультета Веб-разработки.</p>
                <figure className='promo__figure-container'>
                    <img className='promo__section-figure' src={promoFigure} alt='Фигура' />
                </figure>
            </section>
        </article>
    );
}

export default Promo;