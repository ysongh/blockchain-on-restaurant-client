import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return(
        <>
            <div className="mt-3 text-center">
                <h1>Get rewards at restaurant</h1>
                <p>Earn coins when you dine or order meals at any participating restaurants</p>
                <div>
                    <Link to="/" className="btn btn-primary mr-3">
                        Get Started
                    </Link>
                    <Link to="/restaurant" className="btn btn-secondary">
                        See Deals
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Home;