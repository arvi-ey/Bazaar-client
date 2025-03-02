import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';

export default function UserProfile({ name, image }) {
    return (
        <Stack direction="row" spacing={2}>
            {
                name ?
                    <Avatar sx={{ bgcolor: deepOrange[500] }} src={image} >
                        {
                            name
                        }
                    </Avatar>
                    :
                    image ?
                        <Avatar alt="Travis Howard" src={image} />
                        :
                        null
            }

        </Stack>
    );
}
