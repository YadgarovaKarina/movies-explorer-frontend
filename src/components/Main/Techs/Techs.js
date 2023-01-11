import React from 'react';
import './Techs.css';

function Techs() {
    return (
        <article className='techs about-project'>
            <h2 className='techs__title about-project__title'>Технологии</h2>
            <div className='techs__content'>
                <h3 className='techs__subtitle'>7 технологий</h3>
                <p className='techs__text'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
                <ul className='techs__list'>
                    <li className='techs__list-argument'>HTML</li>
                    <li className='techs__list-argument'>CSS</li>
                    <li className='techs__list-argument'>JS</li>
                    <li className='techs__list-argument'>React</li>
                    <li className='techs__list-argument'>Git</li>
                    <li className='techs__list-argument'>Express.js</li>
                    <li className='techs__list-argument'>mongoDB</li>
                </ul>
            </div>
        </article>
    );
}

export default Techs;