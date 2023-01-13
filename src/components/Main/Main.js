import React from 'react';
import './Main.css';
import AboutMe from '../Main/AboutMe/AboutMe';
import Techs from '../Main/Techs/Techs';
import AboutProject from '../Main/AboutProject/AboutProject';
import Promo from '../Main/Promo/Promo';
import Portfolio from './Portfolio/Portfolio';


function Main() {
    return (
        <main className='main'>
            <Promo />
            <AboutProject />
            <Techs />
            <AboutMe />
            <Portfolio />
        </main>
    );
}

export default Main;