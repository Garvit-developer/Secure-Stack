import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ darkMode, setDarkMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-slate-800 dark:bg-gray-900 text-white shadow-lg"> 
      <div className="mycontainer flex justify-between items-center py-5 h-14 px-4 md:px-8 relative">
        {/* Logo */}
        <Link to="/" className="logo font-bold text-white text-2xl px-4 md:px-10 hover:opacity-80 transition-opacity">
          <div className="flex justify-items-start items-center gap-2">
            <img src="/favicon.ico" alt="" className="w-8 h-8" />
          <div>
          {/* <span className="text-green-500">&lt;</span> */}
          <span>Secure {""}</span>
          <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">Stack</span>
          </div>
          </div>

        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-6 text-lg">
          <li>
            <Link to="/" className="hover:text-green-400 transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-green-400 transition-colors">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-green-400 transition-colors">
              Contact
            </Link>
          </li>
          <li>
            <Link to="/settings" className="hover:text-green-400 transition-colors">
              Settings
            </Link>
          </li>
        </ul>

        {/* Dark Mode Toggle & GitHub Button */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={setDarkMode}
            className="p-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-700 transition-colors"
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
          <button className="text-white bg-green-700 my-5 mx-2 rounded-full justify-between items-center ring-white ring-1 hover:bg-green-600 transition-all flex">
            <img
              className="invert w-10 p-1"
              src="/icons/github.svg"
              alt="github logo"
            />
            <span className="font-bold px-2">GitHub</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div
          className="md:hidden cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="absolute top-14 left-0 w-full bg-slate-800 dark:bg-gray-900 border-t border-slate-700 flex flex-col items-center py-4 z-50 animate-slideDown">
            <Link
              to="/"
              className="py-2 w-full text-center hover:bg-slate-700 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="py-2 w-full text-center hover:bg-slate-700 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="py-2 w-full text-center hover:bg-slate-700 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/settings"
              className="py-2 w-full text-center hover:bg-slate-700 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Settings
            </Link>
            <div className="flex items-center gap-4 mt-3">
              <button
                onClick={() => {
                  setDarkMode();
                  setMenuOpen(false);
                }}
                className="p-2 rounded-lg hover:bg-slate-700 transition-colors text-2xl"
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? "☀️" : "🌙"}
              </button>
              <button
                className="text-white bg-green-700 rounded-full flex justify-center items-center ring-white ring-1 hover:bg-green-600 transition-all"
                onClick={() => setMenuOpen(false)}
              >
                <img
                  className="invert w-4 h-4 mr-2"
                  src="/icons/github.svg"
                  alt="github logo"
                />
                <span className="font-bold">GitHub</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
