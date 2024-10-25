import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

    useEffect(() => {
        let root = document.documentElement.classList;
        theme === 'dark' ? root.add('dark') : root.remove('dark');
        localStorage.setItem('theme', theme)
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => prevTheme === 'light' ? 'dark' : 'light');
    }
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }} >
            <div className="bg-white text-gray-700 dark:text-gray-200 dark:bg-[rgb(16,23,42)] min-h-screen">
                {children}
            </div>
        </ThemeContext.Provider>
    )
}

export default ThemeProvider