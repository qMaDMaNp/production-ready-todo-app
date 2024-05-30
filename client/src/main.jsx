import './scss/main.scss';

import { createRoot } from 'react-dom/client';
import { ThemeContextProvider } from "@/theme/ThemeContextProvider";
import AuthProvider from './providers/AuthProvider';
import { SnackStackProvider } from '@views/components/SnackbarComponent';

import RootLayout from '@views/layouts/RootLayout';
import AppLayout from '@views/layouts/AppLayout';

createRoot(document.getElementById('root')).render(
	<SnackStackProvider>
		<ThemeContextProvider>
			<AuthProvider>
				<RootLayout>
					<AppLayout />
				</RootLayout>
			</AuthProvider>
		</ThemeContextProvider>
	</SnackStackProvider>
);
