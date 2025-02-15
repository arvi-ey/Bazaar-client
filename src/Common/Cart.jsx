import * as React from 'react';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import ShoppingBagRoundedIcon from '@mui/icons-material/ShoppingBagRounded';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

export default function ShowZeroBadge({ count }) {
    return (
        <Stack spacing={4} direction="row" sx={{ color: 'action.active' }}>
            <Badge color="success" badgeContent={count} showZero
                sx={{
                    '& .MuiBadge-badge': {
                        backgroundColor: '#ec0d75',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '12px',
                    }
                }}
            >
                <ShoppingBagOutlinedIcon sx={{ color: "black", }} />
            </Badge>
        </Stack>
    );
}
