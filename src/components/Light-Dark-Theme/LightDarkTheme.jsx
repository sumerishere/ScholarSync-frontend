// ThemeToggle.js
import { useEffect, useState } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

const ThemeToggle = () => {
    const [isDarkMode, setDarkMode] = useState(false);

    const toggleDarkMode = (checked) => {
        setDarkMode(checked);
        document.documentElement.setAttribute('data-theme', checked ? 'dark' : 'light');
        localStorage.setItem('theme', checked ? 'dark' : 'light'); // Save to local storage
    };

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            setDarkMode(storedTheme === 'dark');
            document.documentElement.setAttribute('data-theme', storedTheme);
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setDarkMode(prefersDark);
            document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
        }
    }, []);

    return (
        <DarkModeSwitch
            style={{ marginBottom: '2rem' }}
            checked={isDarkMode}
            onChange={toggleDarkMode}
            size={120}
        />
    );
};

export default ThemeToggle;