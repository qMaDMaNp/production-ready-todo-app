import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import LaptopIcon from '@mui/icons-material/Laptop';
import TvIcon from '@mui/icons-material/Tv';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';

export const rowLengths = [
    {
        title: '1',
        icon: <PhoneAndroidIcon/>,
    },
    {
        title: '2',
        icon: <LaptopIcon/>,
    },
    {
        title: '3',
        icon: <TvIcon/>,
    }
];


export default function RowLengthSwitch({rowLength, setRowLength}) {
    const handleRowLength = (e, newRowLength) => {
        if (newRowLength !== null) {
            setRowLength(newRowLength);
        }
    };

    return (
        <Stack direction="row" spacing={4}>
            <ToggleButtonGroup
                value={rowLength}
                exclusive
                onChange={handleRowLength}
                aria-label="text rowLength"
            >
                {rowLengths.map(rowLength => (
                    <ToggleButton key={rowLength.title} value={rowLength.title} aria-label={rowLength.title}>
                        {rowLength.icon}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
        </Stack>
    );
}