import React, { useState, useEffect } from "react";
import RedditFeed from "../components/RedditFeed";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check for saved theme in localStorage on initial load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }
  }, []);

  // Toggle dark mode and save the theme to localStorage
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newTheme = !prev ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return !prev;
    });
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
      <div className="flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold text-center my-4">Seasoning Sent ME</h1>

        <button
          onClick={toggleDarkMode}
          className="relative w-16 h-9 rounded-full bg-gray-300 dark:bg-gray-700 transition-colors duration-300 focus:outline-none"
          title="Toggle theme"
        >
          <span className="absolute left-1 top-1 text-lg pointer-events-none">🌞</span>
          <span className="absolute right-1 top-1 text-lg pointer-events-none">🌙</span>
          <span
            className={`absolute top-1 left-1 w-7 h-7 rounded-full bg-white dark:bg-black transform transition-transform duration-300 ${
              isDarkMode ? "translate-x-7" : ""
            }`}
          />
        </button>
      </div>

      <RedditFeed />
    </main>
  );
}
