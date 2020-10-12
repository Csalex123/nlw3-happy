import React from 'react';
import { FiArrowRight } from 'react-icons/fi'

import './styles.scss';

import logoImg from '../../assets/landing.svg';

const Landing = () => {
    return (
        <div id="page-landing">
            <div className="content-wrapper">
                <img src={logoImg} alt="Happy logo" />

                <main>
                    <h1>Leve felicidade para o mundo</h1>
                    <p>Visite orfanatos e mude o dia de muitas crianças.</p>
                </main>

                <div className="location">
                    <strong>Pernambuco</strong>
                    <span>Recife</span>
                </div>

                <a href="teste" className="enter-app">
                    <FiArrowRight size={26} color="rgba(0,0,0, 0.6)" />
                </a>
            </div>
        </div>
    );
}

export default Landing;
