import React from "react";
import {
  Moon,
  Sun,
  RotateCcw,
  Download,
  Shuffle,
  Save,
  CandlestickChart,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface NavbarProps {
  isDark: boolean;
  onToggelPattern: () => void;
  onToggleTheme: () => void;
  onReset: () => void;
  onExport: () => void;
  onRandomGenerate: () => void;
  onSaveToHistory: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  isDark,
  onToggelPattern,
  onToggleTheme,
  onReset,
  onExport,
  onRandomGenerate,
  onSaveToHistory,
}) => {
  const handleSaveClick = () => {
    onSaveToHistory();
    toast.success("Saved to history!", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: isDark ? "dark" : "light",
    });
  };

  return (
    <>
      <nav className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Candlestick Generator
              </h1>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={onToggelPattern}
                className="p-2 rounded-lg bg-pink-100 hover:bg-pink-200 dark:bg-pink-900 dark:hover:bg-pink-800 text-pink-600 dark:text-pink-300 transition-colors"
                title="Predefined Patterns"
              >
                <CandlestickChart className="w-5 h-5" />
              </button>

              <button
                onClick={handleSaveClick}
                className="p-2 rounded-lg bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900 dark:hover:bg-indigo-800 text-indigo-600 dark:text-indigo-300 transition-colors"
                title="Save to History"
              >
                <Save className="w-5 h-5" />
              </button>

              <button
                onClick={onRandomGenerate}
                className="p-2 rounded-lg bg-purple-100 hover:bg-purple-200 dark:bg-purple-900 dark:hover:bg-purple-800 text-purple-600 dark:text-purple-300 transition-colors"
                title="Random Generate"
              >
                <Shuffle className="w-5 h-5" />
              </button>

              <button
                onClick={onReset}
                className="p-2 rounded-lg bg-orange-100 hover:bg-orange-200 dark:bg-orange-900 dark:hover:bg-orange-800 text-orange-600 dark:text-orange-300 transition-colors"
                title="Reset"
              >
                <RotateCcw className="w-5 h-5" />
              </button>

              <button
                onClick={onExport}
                className="p-2 rounded-lg bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800 text-green-600 dark:text-green-300 transition-colors"
                title="Export"
              >
                <Download className="w-5 h-5" />
              </button>

              <button
                onClick={onToggleTheme}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 transition-colors"
                title="Toggle Theme"
              >
                {isDark ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Toast container must be included */}
      <ToastContainer />
    </>
  );
};

export default Navbar;
