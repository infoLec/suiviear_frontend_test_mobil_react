import * as React from 'react';

import { Box, List, ListItem, Typography, Chip } from '@mui/material';

import { Phone } from '@mui/icons-material';
import { Commande } from '../types/Commande';

type items = {
    name: string | React.ReactNode;
    element: React.ReactNode;
};

type props = {
    commande: Commande;
};

export default class CommandInfo extends React.Component<props> {
    render(): React.ReactNode {
        const items: items[] = [
            {
                name: 'Commande',
                element: (
                    <Typography variant="h6" component="div">
                        {this.props.commande.cde}
                    </Typography>
                )
            },
            {
                name: 'Reference',
                element: <Typography component="div">{this.props.commande.reference}</Typography>
            },
            {
                name: 'client',
                element: <Typography component="p">{this.props.commande.client}</Typography>
            },
            {
                name: 'adresse',
                element:
                    this.props.commande.address.street2 !== null &&
                    (this.props.commande.address.zip !== null ||
                        this.props.commande.address.city != null) ? (
                        <>
                            <Typography component="p">
                                {this.props.commande.address.street2}
                            </Typography>
                            <Typography component="p">
                                {this.props.commande.address.zip} {this.props.commande.address.city}
                            </Typography>
                        </>
                    ) : null
            },
            {
                name: '',
                element: (
                    <Typography component="div">
                        {this.props.commande.address.tel !== null ? (
                            <Chip
                                variant="outlined"
                                color="primary"
                                icon={<Phone />}
                                label={this.props.commande.address.tel}
                            />
                        ) : null}
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
