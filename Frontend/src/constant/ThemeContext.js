import React, { createContext, useState, useEffect } from "react";

// Create a context
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Default theme values (fallback)
  const defaultTheme = {
    "--background-color": "#fff",
    "--background-light": "#fff",
    "--shadow-color": "rgba(0,0,0,0.2)",
    "--text-color": "#0A0A0A",
    "--text-light": "#575757",
    "--primary-color": "rgb(0,200,83)",
    "--font-size": "16px",
    "--animation-speed": 1,
  };

  // State for theme
  const [theme, setTheme] = useState(defaultTheme);

  // Load theme from localStorage on first render
  useEffect(() => {
    const savedTheme = localStorage.getItem("list");
    if (savedTheme) {
      setTheme(JSON.parse(savedTheme));
    }
  }, []);

  // Apply theme variables to the root
  useEffect(() => {
    Object.keys(theme).forEach((key) => {
      document.documentElement.style.setProperty(key, theme[key]);
    });
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
