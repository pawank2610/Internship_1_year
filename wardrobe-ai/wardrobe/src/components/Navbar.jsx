import { Shirt, Sun, Moon, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar({ currentPage, onNavigate, darkMode, setDarkMode }) {
  const { signOut } = useAuth();

  return (
    <nav className="bg-white dark:bg-stone-800 border-b border-stone-200 dark:border-stone-700 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-amber-400 rounded-lg flex items-center justify-center">
            <Shirt size={16} className="text-stone-900" />
          </div>
          <span className="text-stone-900 dark:text-white font-semibold">Wardrobe AI</span>
        </div>

        {/* Nav Links */}
        <div className="flex items-center gap-6">
          {['home', 'wardrobe', 'outfits', 'weekly'].map((p) => (
            <button
              key={p}
              onClick={() => onNavigate(p)}
              className={`text-sm font-medium capitalize transition ${
                currentPage === p
                  ? 'text-amber-600'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              {p === 'weekly' ? 'Weekly Plan' : p}
            </button>
          ))}
        </div>

        {/* Right side buttons */}
        <div className="flex items-center gap-2">
          {/* Dark/Light Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg bg-stone-100 dark:bg-stone-700 hover:bg-stone-200 dark:hover:bg-stone-600 transition"
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode
              ? <Sun size={18} className="text-amber-400" />
              : <Moon size={18} className="text-stone-600" />
            }
          </button>

          {/* Sign Out */}
          <button
            onClick={signOut}
            className="p-2 rounded-lg bg-stone-100 dark:bg-stone-700 hover:bg-stone-200 dark:hover:bg-stone-600 transition"
            title="Sign out"
          >
            <LogOut size={18} className="text-stone-600 dark:text-stone-400" />
          </button>
        </div>

      </div>
    </nav>
  );
}