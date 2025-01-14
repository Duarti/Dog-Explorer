import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => (
    <header className={`w-full bg-primary-dark text-white py-4 shadow-md`}>
        <h1 className="text-4xl font-bold ml-5 text-center md:text-left">
            <Link to="/">Dog Explorer</Link>
        </h1>
    </header>
);

export default Header;
