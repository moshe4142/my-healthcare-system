// ThemeContext.tsx
import React, {
  createContext,
  useContext,
  ReactNode,
  useMemo,
  useState,
  useEffect,
} from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

type ThemeContextType = {
  theme: "light" | "dark";
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeMode, setThemeMode] = useState<"light" | "dark">("dark");

  // שלב ראשון: קריאה מה-localStorage כשנטען בדפדפן
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved === "light" || saved === "dark") {
        setThemeMode(saved);
      }
    }
  }, []);

  // שלב שני: שמירת מצב הנושא ב-localStorage בכל שינוי
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", themeMode);
    }
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
          background: {
            default: themeMode === "dark" ? "#121212" : "#f5f5f5",
            paper: themeMode === "dark" ? "#1e1e1e" : "#ffffff",
          },
          text: {
            primary: themeMode === "dark" ? "#ffffff" : "#000000",
          },
        },
        components: {
          MuiInputBase: {
            styleOverrides: {
              root: {
                backgroundColor: themeMode === "dark" ? "#2c2c2c" : "#fff",
                color: themeMode === "dark" ? "#fff" : "#000",
                borderRadius: 4,
                padding: "6px 10px",
              },
              input: {
                "::placeholder": {
                  color: themeMode === "dark" ? "#aaa" : "#666",
                },
              },
            },
          },
        },
      }),
    [themeMode]
  );

  return (
    <ThemeContext.Provider value={{ theme: themeMode, toggleTheme }}>
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
