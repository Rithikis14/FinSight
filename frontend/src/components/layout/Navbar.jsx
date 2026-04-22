import React from 'react';
import { Sun, Moon, LineChart, LayoutDashboard, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = ({ darkMode, setDarkMode }) => {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm transition-colors duration-300">
      <div className="container mx-auto px-6 h-18 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-2xl tracking-tight">
          <LineChart className="text-primary" size={26} />
          <span>Wealth<span className="text-primary">AI</span></span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-10 text-base font-semibold text-slate-700 dark:text-slate-300">
          <Link to="/dashboard" className="hover:text-primary transition-colors flex items-center gap-2.5">
            <LayoutDashboard size={19} /> Dashboard
          </Link>
          <Link to="/analysis" className="hover:text-primary transition-colors flex items-center gap-2.5">
            <MessageSquare size={19} /> AI Analyst
          </Link>
        </div>

        {/* Theme Toggle Button */}
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 hover:ring-2 ring-primary transition-all"
        >
          {darkMode ? (
            <Sun size={20} className="text-yellow-400" />
          ) : (
            <Moon size={20} className="text-slate-600" />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;