import * as React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';

import { Menu, LocalShipping } from '@mui/icons-material';

export class HeaderComponent extends React.Component {
    render() {
        return (
            <AppBar
                position="static"
                sx={{
                    width: '100%'
                }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}>
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {'024450'}
                    </Typography>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}>
                        <LocalShipping />
                    </IconButton>
                </Toolbar>
            </AppBar>
        );
    }
}
