
import React from 'react';
import { View } from '../../types';

interface HeaderProps {
    currentView: View;
    setView: (view: View) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
    const activeClass = "bg-sky-600 text-white";
    const inactiveClass = "bg-white text-sky-600 hover:bg-sky-100";

    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
                    Restaurant POS
                </h1>
                <div className="flex items-center space-x-2 bg-slate-200 rounded-full p-1">
                    <button
                        onClick={() => setView(View.Waiter)}
                        className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${currentView === View.Waiter ? activeClass : inactiveClass}`}
                    >
                        Waiter View
                    </button>
                    <button
                        onClick={() => setView(View.Manager)}
                        className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${currentView === View.Manager ? activeClass : inactiveClass}`}
                    >
                        Manager View
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
