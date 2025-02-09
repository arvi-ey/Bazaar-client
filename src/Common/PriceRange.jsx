import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

export default function MultipleSelectCheckmarks({ Label, Prices }) {
    const [personName, setPersonName] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <div>
            <FormControl sx={{ width: 200, marginTop: 2 }}>
                <InputLabel id="demo-multiple-checkbox-label"
                // sx={{ color: "#ec0d75", '&.Mui-focused': { color: '#ec0d75' } }}

                >{Label}</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput
                        // sx={{
                        //     '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        //         borderColor: '#ec0d75',  // Change border color on focus
                        //     },
                        //     '&:hover .MuiOutlinedInput-notchedOutline': {
                        //         borderColor: '#ec0d75',  // Change border color on hover
                        //     },
                        // }}

                        label={Label} />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {Prices.map((data, index) => (
                        <MenuItem key={index} value={data.price}>
                            <Checkbox
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
                                checked={personName.includes(data.price)} />
                            <ListItemText primary={data.range} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}