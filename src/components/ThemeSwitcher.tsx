import { useEffect } from 'react';
import { ThemeName, useThemeStore } from '../stores/themeStore';
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
import { BiCoffeeTogo } from "react-icons/bi";

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
        <button onClick={handleThemeChange}>
            {theme == ThemeName.Dark && <FaMoon className='h-5 w-5' />}
            {theme == ThemeName.Light && <FaSun className='h-5 w-5' />}
            {theme == ThemeName.Coffee && <BiCoffeeTogo className='h-5 w-5' />}
        </button>
    )
}

export default ThemeSwitcher;
