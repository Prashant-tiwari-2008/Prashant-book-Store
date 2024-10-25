import { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext';

const themeToggle = () => {
    const { theme, toggleTheme } = useContext(ThemeContext)

    return (
        // todo : change this with icon
        <button onClick={toggleTheme} className='p-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white'>
            {theme === 'dark' ? 'Switch to light mode' : 'switch to dark mode'}
        </button>
    )
}

export default themeToggle