import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return(
        <footer className="primary-color py-4 ">
            <div className="d-flex justify-content-center mb-2">
                <Link className="nav-link" to="/">Home</Link>
                <Link className="nav-link" to="/deal">Deals</Link>
                <Link className="nav-link" to="/restaurant">Restaurant</Link>
                <Link className="nav-link" to="/coin">Coin</Link>
                <Link className="nav-link" to="/register">Get Started</Link>
            </div>
            <p className="text-center">Copyright &copy;{new Date().getFullYear()} Eat Out Coin</p>
        </footer>
    );
};

export default Footer;