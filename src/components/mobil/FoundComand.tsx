import { Close, Message } from '@mui/icons-material';
import {
    AppBar,
    Drawer,
    IconButton,
    Box,
    Typography,
    List,
    ListItemButton,
    ListItemText,
    ListItem,
    Chip
} from '@mui/material';
import * as React from 'react';
import { Representant } from '../../types/Representant';
import { Error, Mail } from '@mui/icons-material';
import { Commande } from '../../types/Commande';
import { DelaiOperation, MessageOperation } from '../../tools/operation';
import { red } from '@mui/material/colors';

interface Props {
    userEmail: string;
    open: boolean;
    onClose: () => void;
    reps: Representant[];
    clickedCde: (repName: string, cde: Commande) => void;
}

export default class FoundCommand extends React.Component<Props> {
    render(): React.ReactNode {
        return (
            <Drawer anchor="left" open={this.props.open} onClose={this.props.onClose}>
                <AppBar position="fixed" sx={{ width: '100%', bgcolor: 'white' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            // position: 'fixed',
                            // justifyContent: 'space-between',
                            padding: 1,
                            color: 'black'
                        }}>
                        <IconButton onClick={this.props.onClose}>
                            <Close />
                        </IconButton>
                        <Typography variant="h6">Commandes</Typography>
                    </Box>
                </AppBar>
                <Box sx={{ paddingTop: 6, paddingBottom: 2 }}>
                    <List>
                        {this.props.reps.map((rep, index) => (
                            <ListItem
                                key={index}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start'
                                }}>
                                <ListItemText>
                                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                        {rep.repName}
                                        {DelaiOperation.numberOfCdesWithPbDelai(rep.cdes) > 0 && (
                                            <Chip
                                                label={DelaiOperation.numberOfCdesWithPbDelai(
                                                    rep.cdes
                                                )}
                                                icon={<Error />}
                                                color="error"
                                                sx={{ marginLeft: '10px' }}
                                            />
                                        )}
                                        {MessageOperation.numberOdCdeWithUnRead(
                                            rep.cdes,
                                            this.props.userEmail
                                        ) > 0 && (
                                            <Chip
                                                label={MessageOperation.numberOdCdeWithUnRead(
                                                    rep.cdes,
                                                    this.props.userEmail
                                                )}
                                                icon={<Mail />}
                                                color="primary"
                                                sx={{ marginLeft: '10px' }}
                                            />
                                        )}
                                    </Typography>
                                </ListItemText>
                                <List
                                    sx={{
                                        width: '100%'
                                    }}>
                                    {rep.cdes.map((cde) => (
                                        <ListItemButton
                                            sx={{
                                                backgroundColor: DelaiOperation.pbDelaibyCommande(
                                                    cde
                                                )
                                                    ? red[100]
                                                    : 'white',
                                                '&:hover': {
                                                    backgroundColor:
                                                        DelaiOperation.pbDelaibyCommande(cde)
                                                            ? red[200]
                                                            : 'white'
                                                },

                                                width: '100%'
                                            }}
                                            key={cde.cde}
                                            onClick={(): void =>
                                                this.props.clickedCde(rep.repName, cde)
                                            }>
                                            <ListItemText primary={cde.cde + ' ' + cde.reference} />
                                            {MessageOperation.numberOfUnreadByCde(
                                                cde,
                                                this.props.userEmail
                                            ) > 0 && (
                                                <Chip
                                                    label={MessageOperation.numberOfUnreadByCde(
                                                        cde,
                                                        this.props.userEmail
                                                    )}
                                                    icon={<Mail />}
                                                    color="primary"
                                                    sx={{ marginLeft: '2px' }}
                                                />
                                            )}
                                        </ListItemButton>
                                    ))}
                                </List>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        );
    }
}
