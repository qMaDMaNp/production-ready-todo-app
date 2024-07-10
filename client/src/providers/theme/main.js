import { blue, green } from "@mui/material/colors";
import { createTheme } from "@mui/material";
import { useMemo, useState } from "react";

const theme = {
    palette: {
        primary: blue,
    },
};

export const getDesignPallet = (mode) => ({
    palette: {
        mode,
        ...(mode === "light"
            ? {
                // palette values for light mode
                primary: blue,
                success: green,
                text: {
                    // primary: grey[900],
                    // secondary: grey[800],
                },
            }
            : {
                // palette values for dark mode
                primary: blue,
                success: green,
            }),
    },
});

export const useColorTheme = () => {
    const iniMode = localStorage.getItem('themeMode') || 'light';
    const [mode, setMode] = useState(iniMode);

    const toggleColorMode = () => {
        setMode((prevMode) => {
            const nextMode = prevMode === 'light' ? 'dark' : 'light';

            localStorage.setItem('themeMode', nextMode);
            return nextMode
        });
    };

    const modifiedTheme = useMemo(
        () => createTheme(getDesignPallet(mode)),
        [mode]
    );

    return {
        theme: modifiedTheme,
        mode,
        toggleColorMode,
    };
};

export default {
    theme,
    getDesignPallet,
    useColorTheme
}