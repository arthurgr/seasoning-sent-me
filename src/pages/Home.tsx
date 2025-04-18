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
    <main className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <div className="flex justify-between p-4">
        <h1 className="text-2xl font-bold text-center my-4">Reddit Feed</h1>
        <button
          onClick={toggleDarkMode}
          className="bg-gray-800 text-white p-2 rounded"
        >
          {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
      </div>
      <RedditFeed />
    </main>
  );
}
