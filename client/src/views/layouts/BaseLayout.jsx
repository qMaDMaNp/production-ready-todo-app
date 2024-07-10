import Container from '@mui/material/Container';
import HeaderComponent from '@views/layouts/header/HeaderComponent';
import FooterComponent from '@views/layouts/footer/FooterComponent';

import { useThemeContext } from "@/providers/theme/ThemeContextProvider";
import { grey } from '@mui/material/colors';

export default function BaseLayout({ children }) {
    const { mode } = useThemeContext();

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            backgroundColor: mode === 'light' && grey[100]
        }}>
            <HeaderComponent />

            <Container maxWidth={false} style={{ flexGrow: 1 }}>
                <main>
                    {children}
                </main>
            </Container>

            <FooterComponent />
        </div>
    );
}
