import * as React from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Box,
    Menu,
    MenuItem,
    Divider,
    ListItemIcon
} from '@mui/material';

import {
    LocalShipping,
    AddCircle,
    Menu as MenuIcon,
    Message,
    Mail,
    Print
} from '@mui/icons-material';
import CommandInfo from './CommandInfo';
import MailDialog from './mails/MailDialog';
import MessageDialog from './messages/MessageDialog';
import FoundCommand from './FoundComand';
import { Representant } from '../../types/Representant';
import { Commande } from '../../types/Commande';
import ArticleList from './ArticleList';
import DataManager from '../../services/dataManager';

type props = {
    reps: Representant[];
    usermail: string;
    showSnackbar: (message: string, severity: 'success' | 'info' | 'warning' | 'error') => void;
};

type menuItem =
    | {
          label: string;
          icon: React.ReactNode;
          onClick: () => void;
      }
    | 'divider';

type state = {
    commandClicked: {
        repName: string;
        cde: Commande;
    };
    anchorEl: null | HTMLElement;
    messageDialog: {
        open: boolean;
    };
    mailDialog: {
        open: boolean;
        type: 'AR' | 'BL';
    };
    menu: {
        open: boolean;
    };
};
export default class MainComponent extends React.Component<props, state> {
    constructor(props: props) {
        super(props);
        this.state = {
            commandClicked: {
                repName: this.props.reps[0].repName,
                cde: this.props.reps[0].cdes[0]
            },
            anchorEl: null,
            mailDialog: {
                open: false,
                type: 'AR'
            },
            messageDialog: {
                open: false
            },
            menu: {
                open: false
            }
        };
    }

    // getMailInfo = (
    //     type: 'AR' | 'BL',
    //     cde: string
    // ): {
    //     to: string;
    //     cc: string;
    //     subject: string;
    //     body: string;
    // } => {
    //     const req: Promise<any> =
    //             type === 'BL' ? DataManager.getMailerInfoBL(cde) : DataManager.getMailerInfo(cde),
    //         mailInfo: {
    //             to: string;
    //             cc: string;
    //             subject: string;
    //             body: string;
    //         } = {
    //             to: '',
    //             cc: '',
    //             subject: '',
    //             body: ''
    //         };

    //     req.then((res: any) => {
    //         console.log(res);
    //         mailInfo.to = res.data.to;
    //         mailInfo.cc = this.props.usermail;
    //         mailInfo.subject = res.data.subject;
    //         mailInfo.body = res.data.body;
    //     }).catch((err: any) => {
    //         console.log(err);
    //     });

    //     console.log(mailInfo);
    //     return mailInfo;
    // };

    onClose = (): void => {
        this.setState({ mailDialog: { open: false, type: 'AR' } });
        this.setState({ messageDialog: { open: false } });
        this.setState({ menu: { open: false } });
    };

    render(): JSX.Element {
        const menuItems: menuItem[] = [
            {
                label: 'messagerie',
                icon: <Message />,
                onClick: (): void => {
                    this.setState({ messageDialog: { open: true } });
                }
            },
            'divider',
            {
                label: 'envoyer par mail AR',
                icon: <Mail />,
                onClick: (): void => {
                    this.setState({ mailDialog: { open: true, type: 'AR' } });
                }
            },

            {
                label: 'envoyer par mail BL',
                icon: <Mail />,
                onClick: (): void => {
                    this.setState({ mailDialog: { open: true, type: 'BL' } });
                }
            },
            'divider',
            {
                label: 'telechargement AR',
                icon: <Print />,
                onClick: (): void => {
                    console.log('messagerie');
                }
            },
            {
                label: 'telechargement BL',
                icon: <Print />,
                onClick: (): void => {
                    console.log('messagerie');
                }
            }
        ];
        return (
            <>
                <AppBar
                    position="fixed"
                    sx={{
                        width: '100%'
                    }}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                        <IconButton
                            onClick={(): void => {
                                this.setState({ menu: { open: true } });
                            }}
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{}}>
                            <MenuIcon />
                        </IconButton>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                            <Typography variant="h6" component="div" sx={{ mr: 0.5 }}>
                                {this.state.commandClicked.cde.cde}
                            </Typography>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 0.5 }}>
                                <LocalShipping />
                            </IconButton>
                        </Box>
                        <IconButton
                            id="addButton"
                            size="large"
                            edge="end"
                            color="inherit"
                            aria-label="menu"
                            onClick={(event: React.MouseEvent<HTMLButtonElement>): void => {
                                this.setState({ anchorEl: event.currentTarget });
                            }}>
                            <AddCircle />
                        </IconButton>
                        <Menu
                            open={this.state.anchorEl !== null}
                            onClose={(): void => {
                                this.setState({ anchorEl: null });
                            }}
                            anchorEl={this.state.anchorEl}>
                            {menuItems.map((item, index) => {
                                return item !== 'divider' ? (
                                    <MenuItem
                                        key={index}
                                        onClick={(): void => {
                                            item.onClick();
                                            this.setState({ anchorEl: null });
                                        }}>
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                        {item.label}
                                    </MenuItem>
                                ) : (
                                    <Divider key={index} />
                                );
                                // <Me
                            })}
                        </Menu>
                    </Toolbar>
                    <FoundCommand
                        userEmail={this.props.usermail}
                        clickedCde={(repName: string, cde: Commande): void => {
                            this.setState({ commandClicked: { repName, cde } });
                        }}
                        reps={this.props.reps}
                        open={this.state.menu.open}
                        onClose={this.onClose}
                    />
                    <MailDialog
                        open={this.state.mailDialog.open}
                        type={this.state.mailDialog.type}
                        onClose={this.onClose}
                        usermail={this.props.usermail}
                        cde={this.state.commandClicked.cde.cde}
                        // mailerInfo={
                        //     this.state.mailDialog.type === 'BL'
                        //         ? this.getMailInfo('BL', this.state.commandClicked.cde.cde)
                        //         : this.getMailInfo('AR', this.state.commandClicked.cde.cde)
                        // }
                    />

                    <MessageDialog
                        userEmail={this.props.usermail}
                        open={this.state.messageDialog.open}
                        onClose={this.onClose}
                        commande={this.state.commandClicked}
                    />
                </AppBar>

                <CommandInfo commande={this.state.commandClicked.cde} />
                <ArticleList articles={this.state.commandClicked.cde.articles} />
            </>
        );
    }
}
