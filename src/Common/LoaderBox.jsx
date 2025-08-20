import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function LoaderBox({ }) {

    return (
        <div>

            {
                Array.from({ length: 20 }).map((data, index) => {
                    return (

                        <Stack spacing={0.2} sx={{ display: "flex" }} key={index}>
                            <Skeleton variant="rounded" width={260} height={350} />
                            <Skeleton variant="text" width={260} height={30} />
                            <Skeleton variant="text" width={260} height={30} />
                        </Stack>
                    )
                }
                )
            }

        </div>
    );
}
