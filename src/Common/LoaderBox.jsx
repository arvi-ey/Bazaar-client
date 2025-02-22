import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function LoaderBox() {
    return (
        <Stack spacing={0.2} sx={{ display: "flex" }}>
            <Skeleton variant="rounded" width={260} height={350} />
            <Skeleton variant="text" width={260} height={30} />
            <Skeleton variant="text" width={260} height={30} />
        </Stack>
    );
}
