import React, { useEffect, useState } from 'react'
import "./Filterbar.css"
import CheckboxLabels from '../../Common/Checkbox'
import Divider from '@mui/material/Divider';
import PriceRange from '../../Common/PriceRange';
import RadioButtonsGroup from '../../Common/RadioButton';
import { useDispatch } from 'react-redux';
import { AddPriceRange, AddSize, AddRating } from "../../../Redux/Slice/filterSlicer"
const Filterbar = () => {
    const dispatch = useDispatch()
    const [selectedPrice, setSelectedPrice] = useState(0);

    const priceRangeArray = [
        {
            price: 0,
            range: "₹0 - ₹6000"
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





    useEffect(() => {
        dispatch(AddPriceRange(0))
    }, [dispatch])

    const HandleSelectPriceRange = (e) => {
        setSelectedPrice(e.target.value)
        dispatch(AddPriceRange(e.target.value))

    }



    return (
        <div className="filterContainer">
            <div className="select-container">
                <label htmlFor="priceRange" className="select-label">
                    Price Range
                </label>
                <select
                    id="priceRange"
                    className="custom-select"
                    value={selectedPrice}
                    onChange={HandleSelectPriceRange}
                >
                    {priceRangeArray.map((item, index) => (
                        <option key={index} value={item.price}>
                            {item.range}
                        </option>
                    ))}
                </select>
            </div>
            {/* <p className='FilterDesc'>Apply filters for better search results</p> */}
        </div>

    )
}

export default Filterbar