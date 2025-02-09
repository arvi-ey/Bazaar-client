import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RadioButtonsGroup({ label, items }) {
    return (
        <div>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
            >
                {
                    items && items.map((data, index) => <FormControlLabel key={index} value={data} control={<Radio />} style={{ opacity: "0.7" }} label={`${data} and Avobe`} />)
                }
            </RadioGroup>
        </div>
    );
}
