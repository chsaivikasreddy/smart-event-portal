import {
  createContext,
  useContext,
  useState,
} from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({
  children,
}) => {
  const [darkMode, setDarkMode] =
    useState(false);

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        setDarkMode,
      }}
    >
      <div
        className={
          darkMode
            ? "dark bg-gray-900 text-white min-h-screen"
            : "bg-gray-100 min-h-screen"
        }
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () =>
  useContext(ThemeContext);