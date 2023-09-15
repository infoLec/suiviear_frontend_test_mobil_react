import * as React from 'react';
import {
    Dialog,
    TextField,
    List,
    ListItem,
    DialogContent,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    FormControl
} from '@mui/material';

import { Close as CloseIcon } from '@mui/icons-material';
type Props = {
    open: boolean;
    usermail: string;
    onClose: () => void;
    type: 'AR' | 'BL';
};

type State = {
    to: string;
    cc: string;
    subject: string;
    body: string;
};

type formItem = {
    label: string;
    value: string;
    multiline?: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default class MailDialog extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            to: '',
            cc: '',
            subject: '',
            body: ''
        };
    }

    render(): React.ReactNode {
        const formItems: formItem[] = [
            {
                label: 'to',
                value: this.state.to,
                onChange: (event: React.ChangeEvent<HTMLInputElement>): void => {
                    this.setState({ to: event.target.value });
                }
            },
            {
                label: 'cc',
                value: this.state.cc,
                onChange: (event: React.ChangeEvent<HTMLInputElement>): void => {
                    this.setState({ cc: event.target.value });
                }
            },

            {
                label: 'subject',
                value: this.state.subject,
                onChange: (event: React.ChangeEvent<HTMLInputElement>): void => {
                    this.setState({ subject: event.target.value });
                }
            },

            {
                label: 'body',
                value: this.state.body,
                multiline: true,
                onChange: (event: React.ChangeEvent<HTMLInputElement>): void => {
                    this.setState({ body: event.target.value });
                }
            }
        ];

        return (
            <Dialog fullScreen maxWidth={'md'} open={this.props.open} onClose={this.props.onClose}>
                {/* <DialogTitle>Envoyer un mail {this.props.type}</DialogTitle> */}
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={this.props.onClose}
                            aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Envoyer un {this.props.type}
                        </Typography>
                        <Button autoFocus color="inherit">
                            Envoyer
                        </Button>
                    </Toolbar>
                </AppBar>

                <DialogContent>
                    <List>
                        {formItems.map((formItem: formItem, index: number) => (
                            <ListItem key={index}>
                                <FormControl fullWidth>
                                    <TextField
                                        label={formItem.label}
                                        value={formItem.value}
                                        multiline={formItem.multiline}
                                        minRows={formItem.multiline ? 5 : undefined}
                                        onChange={formItem.onChange}
                                    />
                                </FormControl>
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
            </Dialog>
        );
    }
}
