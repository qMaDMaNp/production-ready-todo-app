import { createTheme } from "@mui/material";
import { createContext, useContext } from "react";
import { useColorTheme } from "./main";

export const ThemeContext = createContext({
    mode: "light",
    toggleColorMode: () => { },
    theme: createTheme(),
});

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeContextProvider = ({ children }) => {
    const value = useColorTheme();

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};