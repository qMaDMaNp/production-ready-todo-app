import { Paper, Typography } from "@mui/material";
import { indigo } from "@mui/material/colors";

export default function FooterComponent() {
    return (
        <Paper square sx={{ p: 1, bgcolor: indigo[600], textAlign: 'center' }}>
            <Typography color={'white'} variant="bode2">
                Copyright © {new Date().getFullYear()} ProductionTodo
            </Typography>
        </Paper>
    );
}
