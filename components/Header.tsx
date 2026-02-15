import React from 'react';
import { Logo } from './icons/Logo';
import { useUserData } from '../contexts/UserDataContext';
import { LogoutIcon } from './icons/UserIcons';

interface HeaderProps {
    goHome: () => void;
    logout: () => void;
}

const Header: React.FC<HeaderProps> = ({ goHome, logout }) => {
    return (
        <header className="bg-white shadow-sm py-4 px-4 sm:px-6 lg:px-8 sticky top-0 z-20">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                <button onClick={goHome} aria-label="Go to homepage">
                    <Logo className="h-9 w-auto" />
                </button>
                <button
                    onClick={logout}
                    className="flex items-center space-x-2 text-brand-text-light hover:text-brand-text font-semibold transition-colors"
                >
                    <LogoutIcon className="w-5 h-5" />
                    <span>Logout</span>
                </button>
            </div>
        </header>
    );
};

export default Header;
