import React from 'react';
import { Link } from 'react-router-dom';

import HeroImage from '../assets/hero.png';
import Icon1 from '../assets/icon1.svg';
import Icon2 from '../assets/icon2.svg';
import Icon3 from '../assets/icon3.svg';

const Home = () => {
    return(
        <div className="container">
            <div className="row hero">
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

            <div className="row my-5">
                <div className="col-12 col-md-6 col-lg-4 mt-3">
                    <div className="card">
                        <div className="card-body">
                            <img className="icon" src={Icon3} alt="Icon" />
                            <h5 className="card-title text-center mt-3">Earn Coins</h5>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4 mt-3">
                    <div className="card">
                        <div className="card-body">
                            <img className="icon" src={Icon1} alt="Icon" />
                            <h5 className="card-title text-center mt-3">Any Restaurant</h5>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4 mt-3">
                    <div className="card">
                        <div className="card-body">
                            <img className="icon" src={Icon2} alt="Icon" />
                            <h5 className="card-title text-center mt-3">Get Rewards</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;