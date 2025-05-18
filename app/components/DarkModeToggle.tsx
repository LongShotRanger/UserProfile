'use client';

import { useDarkMode } from '../context/DarkModeContext';

export default function DarkModeToggle() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className="px-4 py-2 rounded bg-gray-800 text-white dark:bg-gray-200 dark:text-black"
    >
      {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    </button>
  );
}
