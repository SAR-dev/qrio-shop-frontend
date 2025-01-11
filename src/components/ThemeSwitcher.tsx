import { useEffect } from 'react';
import { ThemeName, useThemeStore } from '../stores/themeStore';
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
import { FaCoffee } from "react-icons/fa";

const ThemeSwitcher = () => {
    const { theme, setTheme } = useThemeStore();

    useEffect(() => {
        setTheme(theme)
    }, [])

    const handleThemeChange = () => {
        if(theme == ThemeName.Dark) setTheme(ThemeName.Light)
        if(theme == ThemeName.Light) setTheme(ThemeName.Coffee)
        if(theme == ThemeName.Coffee) setTheme(ThemeName.Dark)
    }

    return (
        <button className="btn btn-ghost btn-circle" onClick={handleThemeChange}>
            {theme == ThemeName.Dark && <FaMoon className='size-4' />}
            {theme == ThemeName.Light && <FaSun className='size-4' />}
            {theme == ThemeName.Coffee && <FaCoffee className='size-4' />}
        </button>
    )
}

export default ThemeSwitcher;
