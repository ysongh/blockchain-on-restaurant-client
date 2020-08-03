import React from 'react';

const Footer = () => {
    return(
        <footer className="bg-primary text-white p-4 text-center">
            Copyright &copy;{new Date().getFullYear()} Eat Out Coin
        </footer>
    );
};

export default Footer;