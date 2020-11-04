import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../assets/logo2.png';

const Footer = () => {
    return(
        <footer className="primary-color py-4">
            <img className="logo d-block m-auto" src={Logo} alt="Logo" />
            <div className="d-flex justify-content-center mt-1 mb-2">
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