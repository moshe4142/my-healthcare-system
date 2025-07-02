import { Box } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useTheme } from './ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Box
      onClick={toggleTheme}
      sx={{
        width: 52,
        height: 28,
        borderRadius: 16,
        backgroundColor: isDark ? '#374151' : '#e0f2f1',
        border: isDark ? '1.5px solid #4db6ac' : '1.5px solid #80cbc4',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        padding: '3px',
        position: 'relative',
        transition: 'background-color 0.3s ease, border-color 0.3s ease',
        userSelect: 'none',
        boxShadow: isDark
          ? '0 1px 4px rgba(77, 182, 172, 0.3)'
          : '0 1px 4px rgba(0, 121, 107, 0.2)',
      }}
      aria-label="Toggle light/dark mode"
      role="switch"
      aria-checked={isDark}
    >
      <Box
        sx={{
          width: 24,
          height: 24,
          borderRadius: '50%',
          backgroundColor: isDark ? '#4db6ac' : '#00796b',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          position: 'absolute',
          left: isDark ? 'calc(100% - 27px)' : '3px',
          transition: 'left 0.3s ease, background-color 0.3s ease',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}
      >
        {isDark ? (
          <LightModeIcon sx={{ fontSize: 18 }} />
        ) : (
          <DarkModeIcon sx={{ fontSize: 18 }} />
        )}
      </Box>
    </Box>
  );
};

export default ThemeToggle;
