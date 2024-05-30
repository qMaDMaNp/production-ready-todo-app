import { useState } from 'react';

import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    MenuItem,
    Button,
    Container
} from '@mui/material';

import {
    Menu as MenuIcon,
    EngineeringTwoTone as EngineeringTwoToneIcon,
    Brightness4TwoTone as Brightness4TwoToneIcon,
    Brightness7TwoTone as Brightness7TwoToneIcon,
} from '@mui/icons-material';

import { grey } from '@mui/material/colors';

import { useThemeContext } from "@/theme/ThemeContextProvider";

import ProfileMenu from './ProfileMenu';

const pages = [
    // {
    //     title: 'Account',
    //     link: '/'
    // }
];


export default function HeaderComponent() {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const { mode, toggleColorMode } = useThemeContext();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" sx={{ position: 'relative', top: 'auto', bottom: 0, bgcolor: grey[900], backgroundImage: 'none' }}>
            <Container maxWidth={false}>
                <Toolbar disableGutters>
                    <EngineeringTwoToneIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />

                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        ProductionTodo
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page.title}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <EngineeringTwoToneIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />

                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        ProductionTodo
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <a key={page.title} href={page.link}>
                                <Button
                                    startIcon={<Brightness7TwoToneIcon />}
                                    sx={{ my: 0, color: 'white' }}
                                >
                                    <span>{page.title}</span>
                                </Button>
                            </a>
                        ))}
                    </Box>

                    <Box>
                        <IconButton onClick={toggleColorMode} size="large" color="inherit">
                            {mode === "dark" ? <Brightness7TwoToneIcon /> : <Brightness4TwoToneIcon />}
                        </IconButton>
                    </Box>

                    {/* <Box ml={1}>
                        <ProfileMenu />
                    </Box> */}
                </Toolbar>
            </Container>
        </AppBar>
    );
}
