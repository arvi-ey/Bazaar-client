import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';

export default function SnackbarComponent({ isOpen, message, bgColor, severity }) {

    const [open, setOpen] = React.useState(false)


    React.useEffect(() => {
        setOpen(isOpen)
    }, [isOpen])

    const handleClose = (event, reason) => {

        setOpen(false);
    };

    return (
        <div>
            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
                message={message}
            >
                <Alert
                    severity={severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
}
