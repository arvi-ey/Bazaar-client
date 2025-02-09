import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function CheckboxLabels({ label, className }) {
    return (

        <div className={className}>
            {
                label && label.map((data, index) => <FormControlLabel key={index} control={<Checkbox
                // sx={{
                //     // Customize the checkmark color when checked
                //     '&.Mui-checked': {
                //         color: '#9e9e9e', // Change checkmark (tick) color
                //     },
                //     // Customize the checkbox color when not checked (optional)
                //     '&.MuiCheckbox-root': {
                //         color: '#ec0d75', // Default checkbox color
                //     },
                // }}

                />} style={{ opacity: "0.7" }} label={data} />)
            }
        </div>
    );
}