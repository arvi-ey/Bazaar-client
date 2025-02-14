import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';

export default function SnackbarComponent({ isOpen, message, bgColor }) {

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
            />
        </div>
    );
}
