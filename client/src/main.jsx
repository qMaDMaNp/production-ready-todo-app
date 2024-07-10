import './scss/main.scss';

import { createRoot } from 'react-dom/client';

import AuthProvider from '@/providers/auth/AuthProvider';
import { ThemeContextProvider } from "@/providers/theme/ThemeContextProvider";
import { SnackStackProvider } from '@/providers/alert/SnackbarProvider';

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
