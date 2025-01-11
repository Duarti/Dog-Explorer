import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Layout: React.FC = () => {
    return (
        <div className="flex flex-col">
            <Header />
            <main className="flex-1 flex bg-gray-100">
                <div className="flex-1">
                    <Outlet />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
