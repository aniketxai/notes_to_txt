import { Moon, Sun } from 'lucide-react';
import { useApp } from '../context/AppContext';

const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useApp();

  return (
    <button
      onClick={toggleDarkMode}
      className="glass-card p-3 hover:scale-110 transition-transform duration-300"
      aria-label="Toggle dark mode"
    >
      {darkMode ? (
        <Sun className="w-5 h-5 text-yellow-500" />
      ) : (
        <Moon className="w-5 h-5 text-gray-700" />
      )}
    </button>
  );
};

export default DarkModeToggle;
