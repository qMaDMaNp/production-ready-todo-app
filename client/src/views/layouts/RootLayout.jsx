import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import { useThemeContext } from "@/providers/theme/ThemeContextProvider";

export default function RootLayout({ children }) {
    let { theme } = useThemeContext();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}
