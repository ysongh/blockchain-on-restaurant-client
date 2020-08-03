import React from 'react';
import { Link } from 'react-router-dom';

import HeroImage from '../assets/hero.png';

const Home = () => {
    return(
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-6 mt-3">
                    <h1 className="mt-5 mb-3">Get rewards at restaurant</h1>
                    <p className="mb-4">Earn coins when you dine or order meals at any participating restaurants</p>
                    <div>
                        <Link to="/" className="btn primary-color mr-3">
                            Get Started
                        </Link>
                        <Link to="/restaurant" className="btn secondary-color">
                            See Deals
                        </Link>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <img src={HeroImage} alt="Hero" />
                </div>
            </div>
        </div>
    );
};

export default Home;