import { IconButton, Tooltip } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useTheme } from './ThemeContext'; // הנתיב לפי המיקום שלך

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Tooltip title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
      <IconButton
        onClick={toggleTheme}
        sx={{
          transition: 'all 0.3s ease',
          color: theme === 'dark' ? '#fdd835' : '#333',
        }}
      >
        {theme === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggleButton;
