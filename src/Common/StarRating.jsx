import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

export default function StarRating({ value }) {
    return (
        <Stack spacing={1}>
            <Rating name="half-rating-read" defaultValue={value}
                sx={{
                    color: "#ec0d75", // Change color of the rating stars
                }}
                precision={0.5} readOnly />
        </Stack>
    );
}
