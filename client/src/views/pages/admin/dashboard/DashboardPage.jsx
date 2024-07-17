import {
    Grid,
    Typography,
    Box
} from '@mui/material';

import BaseLayout from '@views/layouts/BaseLayout';
import TodoList from './page-components/dashboard-page/TodoList';


export default function DashboardPage() {
    return (
        <BaseLayout>
            <Box py={4}>
                <Grid container spacing={2} justifyContent="space-between" mb={2}>
                    <Grid item xs={12} md={8}>
                        <Typography variant="h5" gutterBottom>
                            Dashboard Page
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <TodoList />
                    </Grid>
                </Grid>
            </Box>
        </BaseLayout>
    );
}