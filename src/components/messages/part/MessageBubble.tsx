import * as React from 'react';

import { Avatar, Box, Container, Typography } from '@mui/material';
import { blue, grey, red } from '@mui/material/colors';
import { Message } from '../../../types/Message';
import { dateFormate } from '../../../tools/formate';

type props = {
    message: Message;
    usermail: string;
};

type Avatar = {
    firstTwoLetters: string | null;
    firstname: string;
    lastname: string;
} | null;

export default class MessageBubble extends React.Component<props> {
    avatarName = (usermail: string): Avatar => {
        if (!this.props.message.contact) {
            return null;
        }

        const { firstName, lastName } = this.props.message.contact;
        const firstTwoLetters = firstName && lastName ? `${firstName[0]}${lastName[0]}` : null;

        return this.props.message.spAccount === usermail
            ? null
            : firstName && lastName
            ? { firstTwoLetters, firstname: firstName, lastname: lastName }
            : null;
    };

    colorStyle = (): { backgroundColor: string; color: string } => {
        if (this.props.message.pbDelai) {
            return { backgroundColor: red[200], color: 'white' };
        }

        return this.props.message.spAccount === this.props.usermail
            ? { backgroundColor: blue[400], color: 'white' }
            : { backgroundColor: grey[100], color: 'black' };
    };

    render(): React.ReactNode {
        return (
            <Container>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'top',
                        flexDirection:
                            this.props.message.spAccount === this.props.usermail
                                ? 'row-reverse'
                                : 'row'
                        // marginTop: 2,
                    }}>
                    <Avatar
                        sx={{
                            bgcolor:
                                this.props.message.spAccount === this.props.usermail
                                    ? blue[400]
                                    : grey[800]
                        }}>
                        {this.avatarName(this.props.usermail)?.firstTwoLetters}
                    </Avatar>
                    <Box>
                        <Box
                            sx={{
                                display: 'flex',
                                backgroundColor: this.colorStyle().backgroundColor,
                                color: this.colorStyle().color,
                                borderRadius: '10px',
                                padding: 2,
                                marginLeft:
                                    this.props.message.spAccount === this.props.usermail ? 0 : 1,
                                marginRight:
                                    this.props.message.spAccount === this.props.usermail ? 1 : 0
                            }}>
                            <Typography
                                style={{
                                    whiteSpace: 'pre-line',
                                    quotes: 'none',
                                    textAlign:
                                        this.props.message.spAccount === this.props.usermail
                                            ? 'right'
                                            : 'left'
                                }}>
                                {this.props.message.message}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',

                                flexDirection:
                                    this.props.message.spAccount === this.props.usermail
                                        ? 'row-reverse'
                                        : 'row'
                                // marginTop: 2,
                            }}>
                            <Typography variant="caption" sx={{ color: grey[500] }}>
                                {dateFormate(this.props.message.createdAt) +
                                    ' - ' +
                                    this.props.message.createdAt.toLocaleTimeString('fr-FR')}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Container>
        );
    }
}
