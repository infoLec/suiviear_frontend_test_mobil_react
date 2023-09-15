import * as React from 'react';

import { Alert, Snackbar } from '@mui/material';

interface Props {
    open: boolean;
    message: string;
    severity: 'success' | 'info' | 'warning' | 'error' | undefined;
    onClose: () => void;
}

export default class AlertComponent extends React.Component<Props> {
    render(): React.ReactNode {
        return (
            <Snackbar
                open={this.props.open}
                autoHideDuration={4000}
                onClose={this.props.onClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert severity={this.props.severity}>{this.props.message}</Alert>
            </Snackbar>
        );
    }
}
