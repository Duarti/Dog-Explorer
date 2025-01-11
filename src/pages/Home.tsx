import React from 'react';
import { Link } from 'react-router-dom';
import { theme, buttonStyles } from '../styles/theme';

const Home: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <main className={`flex-1 flex flex-col justify-center items-center bg-${theme.colors.background} text-center`}>
                <h2 className="text-2xl font-semibold mb-4">
                    Welcome to the React Dashboard
                </h2>
                <p className="text-lg mb-6">
                    Manage data efficiently with features like filtering,
                    sorting, and batch actions.
                </p>
                <Link
                    to="/dashboard"
                    className={buttonStyles.primary}
                >
                    Go to Dashboard
                </Link>
            </main>
        </div>
    );
};

export default Home;
