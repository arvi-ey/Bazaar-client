import React from 'react'
import "./Filterbar.css"
import CheckboxLabels from '../../Common/Checkbox'
import Divider from '@mui/material/Divider';
import PriceRange from '../../Common/PriceRange';
import RadioButtonsGroup from '../../Common/RadioButton';
const Filterbar = () => {

    const priceRangeArray = [
        {
            price: 499,
            range: "₹199 - ₹499"
        },
        {
            price: 799,
            range: "₹499 - ₹799"
        },
        {
            price: 1099,
            range: "₹799 - ₹1099"
        },
        {
            price: 2099,
            range: "₹1099 - ₹2099"
        },
        {
            price: 5099,
            range: "₹2099 - ₹5099"
        },
    ]

    const DiscountArray = ["20%", "40%", "50%", "60%", "70%"]
    const RatingArray = ["4.5", "4", "3", "0"]
    return (
        <div className="filterContainer">
            <p className='FilterTextHeading' >Filters</p>
            <p className='FilterDesc'>Apply filters for better search results</p>
            <Divider sx={{ marginTop: "10px" }} />
            <p className='FilterText' >Size</p>
            <CheckboxLabels
                label={["S", "M", "L", "XL", "XXL"]}
                className="checkbox"
            />
            <Divider />
            <p className='FilterText'>Price Range</p>
            <PriceRange
                Label="Select Price range"
                Prices={priceRangeArray}
            />
            <Divider sx={{ marginTop: "10px" }} />
            <p className='FilterText'>Ratings</p>
            <RadioButtonsGroup
                label="Rating"
                items={RatingArray}
            />
            <Divider />
            <p className='FilterText'>Discounts</p>
            <RadioButtonsGroup
                items={DiscountArray}
            />
        </div>

    )
}

export default Filterbar