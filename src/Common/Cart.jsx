import * as React from 'react';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import ShoppingBagRoundedIcon from '@mui/icons-material/ShoppingBagRounded';

export default function ShowZeroBadge({ count }) {
    return (
        <Stack spacing={4} direction="row" sx={{ color: 'action.active' }}>
            <Badge color="primary" badgeContent={count} showZero  >
                <ShoppingBagRoundedIcon sx={{ color: "black", fontSize: "30px" }} />
            </Badge>
        </Stack>
    );
}
