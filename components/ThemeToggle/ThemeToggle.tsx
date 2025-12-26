import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { BsFillSunFill, BsFillMoonStarsFill } from 'react-icons/bs';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:ring-2 hover:ring-blue-500/50 transition-all duration-300 flex items-center justify-center"
      aria-label="Toggle Dark Mode"
    >
      {theme === 'light' ? (
        <BsFillMoonStarsFill size={18} className="text-indigo-600" />
      ) : (
        <BsFillSunFill size={18} className="text-yellow-400" />
      )}
    </button>
  );
};

export default ThemeToggle;
