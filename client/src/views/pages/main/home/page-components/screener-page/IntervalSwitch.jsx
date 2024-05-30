import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { intervals } from '@/constants/general';


export default function IntervalSwitch({interval, setInterval}) {
    const handleInterval = (e, newInterval) => {
        if (newInterval !== null) setInterval(newInterval);
    };

    return (
        <Stack direction="row" spacing={4}>
            <ToggleButtonGroup
                value={interval}
                exclusive
                onChange={handleInterval}
                aria-label="text interval"
            >
                {intervals.map(interval => (
                    <ToggleButton key={interval} value={interval} aria-label={interval}>
                        {interval}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
        </Stack>
    );
}