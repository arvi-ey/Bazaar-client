import React, { useEffect } from 'react'
import "./Filterbar.css"
import CheckboxLabels from '../../Common/Checkbox'
import Divider from '@mui/material/Divider';
import PriceRange from '../../Common/PriceRange';
import RadioButtonsGroup from '../../Common/RadioButton';
import { useDispatch } from 'react-redux';
import { AddPriceRange, AddSize, AddRating } from "../../../Redux/Slice/filterSlicer"
const Filterbar = () => {
    const dispatch = useDispatch()

    const priceRangeArray = [
        {
            price: 0,
            range: "All"
        },
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



    const HandleSizeSelect = (e) => {
        console.log(e.target.value)
    }

    useEffect(() => {
        dispatch(AddPriceRange(0))
    }, [dispatch])

    const HandleSelectPriceRange = (e) => {
        dispatch(AddPriceRange(e.target.value))

    }



    return (
        <div className="filterContainer">
            <p className='FilterTextHeading' >Filters</p>
            <p className='FilterDesc'>Apply filters for better search results</p>
            <Divider sx={{ marginTop: "10px" }} />
            <p className='FilterText' >Size</p>
            <RadioButtonsGroup
                label="Size"
                items={["S", "M", "L", "XL", "XXL"]}
                HandleSelect={HandleSizeSelect}
            />
            <Divider />
            <p className='FilterText'>Price Range</p>
            <PriceRange
                items={priceRangeArray}
                HandleSelect={HandleSelectPriceRange}
            />
            <Divider sx={{ marginTop: "10px" }} />
            {/* <p className='FilterText'>Ratings</p>
            <RadioButtonsGroup
                label="Rating"
                items={RatingArray}
            /> */}
            <Divider />
            <p className='FilterText'>Discounts</p>
            <RadioButtonsGroup
                items={DiscountArray}
            />
        </div>

    )
}

export default Filterbar