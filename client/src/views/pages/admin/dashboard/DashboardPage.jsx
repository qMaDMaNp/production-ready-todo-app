import {
    Grid,
    Typography,
    Box
} from '@mui/material';

import BaseLayout from '@views/layouts/BaseLayout';
import TodoListList from './page-components/dashboard-page/TodoListList';
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
                        <Grid container justifyContent="center">
                            <Grid item xs={6}>
                                <TodoListList/>
                            </Grid>

                            <Grid item xs={6}>
                                <TodoList />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </BaseLayout>
    );
}