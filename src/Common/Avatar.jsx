import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';

export default function UserProfile({ name, image }) {
    return (
        <div>
            <img src={image} />
        </div>
    );
}
