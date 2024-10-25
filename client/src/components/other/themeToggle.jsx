import { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext';
import { Button } from "flowbite-react";
import { FaMoon, FaSun } from 'react-icons/fa';

const themeToggle = () => {
    const { theme, toggleTheme } = useContext(ThemeContext)

    return (
        <Button onClick={toggleTheme} className='self-center items-center p-2 w-7 h-7 md:w-11 md:h-11' color='gray' pill>
            {theme === 'light' ? <FaSun /> : <FaMoon />}
        </Button>

    )
}

export default themeToggle
