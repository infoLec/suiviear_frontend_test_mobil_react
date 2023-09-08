import * as React from 'react';

import { Box, List, ListItem, Typography } from '@mui/material';

import { Phone } from '@mui/icons-material';

type items = {
    name: string | React.ReactNode;
    element: React.ReactNode;
};

export class CommandInfo extends React.Component {
    render() {
        const items: items[] = [
            {
                name: 'Commande',
                element: (
                    <Typography variant="h6" component="div">
                        {'024450'}
                    </Typography>
                )
            },
            {
                name: 'Reference',
                element: (
                    <Typography variant="h6" component="div">
                        {'GA Montlucon Chateau'}
                    </Typography>
                )
            },
            {
                name: 'client',
                element: (
                    <Typography variant="h6" component="div">
                        {'GA Montlucon Chateau'}
                    </Typography>
                )
            },
            {
                name: 'adresse',
                element: (
                    <Typography variant="h6" component="div">
                        {'15100 ST FLOUR'}
                    </Typography>
                )
            },
            {
                name: <Phone />,
                element: (
                    <Typography variant="h6" component="div">
                        {'M. MELOUX 0470037358'}
                    </Typography>
                )
            }
        ];

        return (
            <Box
                sx={{
                    width: '100%'
                }}>
                <List
                    sx={{
                        width: '100%'
                    }}>
                    {items.map((item, index) => (
                        <ListItem
                            sx={{
                                width: '100%',

                                justifyContent: 'space-between'
                            }}
                            key={index}>
                            <Typography variant="h6" component="div">
                                {item.name}
                            </Typography>
                            {item.element}
                        </ListItem>
                    ))}
                </List>
            </Box>
        );
    }
}
