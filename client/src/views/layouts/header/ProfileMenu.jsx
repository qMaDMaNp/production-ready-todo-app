import { useState, useContext } from 'react';

import {
    Avatar,
    Menu,
    MenuItem,
    ListItemIcon,
    Divider,
    IconButton,
    Link
} from '@mui/material';

import {
    Person as PersonIcon,
    Email as EmailIcon,
    Logout as LogoutIcon,
    Link as LinkIcon,
} from '@mui/icons-material';

import { blue } from '@mui/material/colors';

import { AuthContext } from '../../../providers/AuthProvider';
import LoginModal from '../../components/LoginModal';
import RegisterModal from '../../components/RegisterModal';

export default function ProfileMenu() {
    const { 
        user, 
        isAuth,
        logout
    } = useContext(AuthContext); 

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    if (!isAuth) {
        return (
            <>
                <LoginModal />
                <RegisterModal />
            </>
        );
    };

    const firstEmailLetter = isAuth ? user.email.slice(0, 1).toUpperCase() : null;

    return (
        <>
            <IconButton
                onClick={handleClick}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
                <Avatar sx={{ 
                    width: 32,
                    height: 32,
                    bgcolor: blue[500]
                    }}
                >
                    {firstEmailLetter}
                </Avatar>
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            bgcolor: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {/* <a href="/" as="li"> */}
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <PersonIcon fontSize="small" />
                    </ListItemIcon>
                    Profile
                </MenuItem>
                {/* </a> */}

                <Link href="/dashboard">
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <LinkIcon fontSize="small" />
                        </ListItemIcon>
                        Dashboard
                    </MenuItem>
                </Link>

                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <EmailIcon fontSize="small" />
                    </ListItemIcon>
                    Contact Us
                </MenuItem>

                <Divider />

                <MenuItem onClick={() => logout()}>
                    <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
}