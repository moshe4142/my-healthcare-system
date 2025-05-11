import React, { createContext, useContext, ReactNode, useMemo } from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// No toggle needed — fixed dark theme
const ThemeContext = createContext({
  theme: "dark",
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: "dark",
          background: {
            default: "#121212",
            paper: "#1e1e1e",
          },
          text: {
            primary: "#ffffff",
          },
        },
        components: {
          MuiInputBase: {
            styleOverrides: {
              root: {
                backgroundColor: "#2c2c2c",
                color: "#fff",
                borderRadius: 4,
                padding: "6px 10px",
              },
              input: {
                "::placeholder": {
                  color: "#aaa",
                },
              },
            },
          },
        },
      }),
    []
  );

  return (
    <ThemeContext.Provider value={{ theme: "dark" }}>
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
