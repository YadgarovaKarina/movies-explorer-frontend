import React from 'react';
import './AboutProject.css';

function AboutProject() {
    return (
        <article className='about-project'>
            <h1 className='about-project__title'>О проекте</h1>
            <section className='about-project__container'>
                <div>
                    <h2 className='about-project__subtitle'>Дипломный проект включал 5 этапов</h2>
                    <p className='about-project__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div>
                    <h3 className='about-project__subtitle'>На выполнение диплома ушло 5 недель</h3>
                    <p className='about-project__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </section>
            <section className='about-project__progress'>
                <div className='about-project__two-columns_green'>
                    <div className='about-project__progress-line about-project__progress-line_firts'>1 неделя</div>
                    <p className='about-project__progress-text'>Back-end</p>
                </div>
                <div className='about-project__two-columns_grey'>
                    <div className='about-project__progress-line about-project__progress-line_second'>4 недели</div>
                    <p className='about-project__progress-text'>Front-end</p>
                </div>
            </section>
        </article>
    );
}

export default AboutProject;