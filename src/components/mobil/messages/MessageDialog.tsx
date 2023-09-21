import * as React from 'react';
import {
    AppBar,
    Dialog,
    Toolbar,
    IconButton,
    Typography,
    List,
    Box,
    Container,
    FormControl,
    Button,
    TextField,
    ListItem
} from '@mui/material';
import { Close as CloseIcon, Send } from '@mui/icons-material';
import { Message } from '../../../types/Message';
import { grey } from '@mui/material/colors';
import MessageBubble from './part/MessageBubble';
import { MessageOperation } from '../../../tools/operation';
import { Commande } from '../../../types/Commande';
import { DelaiOperation } from '../../../tools/operation';
import DataManager from '../../../services/dataManager';
type Props = {
    onClose: () => void;
    open: boolean;
    userEmail: string;
    commande: {
        repName: string;
        cde: Commande;
    };
};

type State = {
    open: boolean;
    messages: Message[];
    writting: string;
};

export default class MessageDialog extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            open: false,
            messages:
                this.props.commande.cde.messages !== undefined
                    ? this.props.commande.cde.messages
                    : [],
            writting: ''
        };
    }

    srcoollToBottom = (): void => {
        const element = document.getElementById('message-list');
        if (element) {
            element.scrollTop = element.scrollHeight;
        }
    };

    componentDidUpdate(
        prevProps: Readonly<Props>,
        prevState: Readonly<State>,
        snapshot?: any
    ): void {
        if (prevProps.open !== this.props.open) {
            this.setState({
                open: this.props.open
            });
        }
        if (prevProps.commande.cde.messages !== this.props.commande.cde.messages) {
            this.setState({
                messages:
                    this.props.commande.cde.messages !== undefined
                        ? this.props.commande.cde.messages
                        : []
            });
        }
        this.srcoollToBottom();
    }
    addMessage = (): void => {
        if (this.state.writting !== '') {
            const newMessage: Message = {
                rep: this.props.commande.repName,
                message: this.state.writting,
                spAccount: this.props.userEmail,
                createdAt: new Date(),
                pbDelai: DelaiOperation.pbDelaibyCommande(this.props.commande.cde),
                cde: this.props.commande.cde.cde,
                isRead: false
            };

            DataManager.createMessage(newMessage)
                .then(() => {
                    this.setState({
                        writting: '',
                        messages: [...this.state.messages, newMessage]
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        this.srcoollToBottom();
    };

    render(): React.ReactNode {
        return (
            <Dialog open={this.props.open} onClose={this.props.onClose} fullScreen>
                <AppBar position="fixed">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={this.props.onClose}
                            aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Messagerie
                        </Typography>
                    </Toolbar>
                </AppBar>
                <List
                    id="message-list"
                    sx={{
                        paddingTop: '80px',
                        paddingBottom: '80px'
                    }}>
                    {this.state.messages
                        .sort(MessageOperation.sortByMostRecent)
                        .reverse()
                        .map((message: Message, idx) => (
                            <ListItem key={idx}>
                                <MessageBubble message={message} usermail={this.props.userEmail} />
                            </ListItem>
                        ))}
                </List>
                <Container
                    // fixed

                    sx={{
                        position: 'fixed',
                        left: 0,
                        right: 0,
                        bottom: 0,
                        padding: 2,
                        backgroundColor: grey[200]
                    }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                        <FormControl
                            sx={{
                                width: '100%'
                            }}>
                            <TextField
                                multiline
                                value={this.state.writting}
                                onChange={(e): void => this.setState({ writting: e.target.value })}
                            />
                        </FormControl>
                        <Button
                            onClick={this.addMessage}
                            variant="outlined"
                            sx={{
                                height: 'auto',
                                padding: 2
                            }}>
                            <Send />
                        </Button>
                    </Box>
                </Container>
            </Dialog>
        );
    }
}
