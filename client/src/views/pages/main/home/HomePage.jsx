import {
    Grid,
    Typography,
    Box
} from '@mui/material';

import BaseLayout from '@views/layouts/BaseLayout';


export default function HomePage() {
    return (
        <BaseLayout>
            <Box py={4}>
                <Grid container spacing={2} justifyContent="space-between" mb={2}>
                    <Grid item xs={12} md={8}>
                        <Typography variant="h5" gutterBottom>
                            Home Page
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={8}>
                        Your content here
                    </Grid>
                </Grid>
            </Box>
        </BaseLayout>
    );
}