import React from 'react';

import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface Props {
    open: boolean;
    onClose: () => void;
    content: React.ReactNode;
    title: string;
    severity: 'success' | 'info' | 'warning' | 'error' | undefined;
    action: React.ReactNode;
}

interface State {}

export default class DialogComponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    severity(): {
        bagroundColor: string;
        color: string;
    } {
        switch (this.props.severity) {
            case 'success':
                return { bagroundColor: '#4caf50', color: '#fff' };
            case 'info':
                return { bagroundColor: '#2196f3', color: '#fff' };
            case 'warning':
                return { bagroundColor: '#ff9800', color: '#fff' };
            case 'error':
                return { bagroundColor: '#f44336', color: '#fff' };
            default:
                return { bagroundColor: '#fff', color: '#000' };
        }
    }

    render(): React.ReactNode {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.onClose}
                sx={{
                    backgroundColor: this.severity().bagroundColor,
                    color: this.severity().color
                }}>
                <DialogTitle>{this.props.title}</DialogTitle>
                <DialogContent>{this.props.content}</DialogContent>
                <DialogActions>{this.props.action}</DialogActions>
            </Dialog>
        );
    }
}
