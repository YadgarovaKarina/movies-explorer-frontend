import React from 'react';
import './AboutMe.css';
import photoStudent from '../../../images/photo.svg';

function AboutMe() {
    return (
        <article className='about-me about-project'>
          <h4 className='about-me__title about-project__title'>Студент</h4>
          <div className='about-me__content'>
            <div className='about-me__info'>
              <h5 className='about-me__subtitle'>Виталий</h5>
              <p className='about-me__description'>Фронтенд-разработчик, 30 лет</p>
              <p className='about-me__text'>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
                и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
              <a className='about-me__github' href="https://github.com/YadgarovaKarina" target='_blank' rel="noreferrer">Github</a>
            </div>
            <img className='about-me__photo' src={photoStudent} alt='Фото студента' />
          </div>
        </article>
    );
}

export default AboutMe;