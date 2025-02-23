import React from 'react'
import Productbox from '../Products/Productbox'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { GetProductsByCategory } from '../../../Redux/Slice/productsSlicer'
import SearchIcon from '@mui/icons-material/Search';
import LoaderBox from '../../Common/LoaderBox'

const CategoryProducts = ({ category }) => {
    const { categoryProducts, loading } = useSelector(state => state.product)
    const dispatch = useDispatch()

    useEffect(() => {
        if (category) {
            dispatch(GetProductsByCategory(category))
        }
    }, [dispatch, category])
    const loadingArray = [1, 2, 3, 4, 4, 5, 5, 6, 7, 8, 8]

    return (
        <div className="productComponent">
            <div style={{ fontWeight: "600", fontSize: "1.5vmax", opacity: "0.7" }}>
                {category}
            </div>
            <div className="searchbox">
                <div className="seachContainer">
                    <SearchIcon sx={{ opacity: "0.5" }} />
                    <input
                        placeholder='Search product ....'
                        className='searchInputBox'
                    />
                </div>
            </div>
            {
                loading && loadingArray.map((data, index) => <LoaderBox />)

            }
            {
                Array.isArray(categoryProducts) && categoryProducts?.map((data, index) => (
                    <Productbox
                        products={data}
                        key={index}
                    />
                ))
            }
            <div className='Hasmore'>
                No more products to load ....
            </div>
        </div>
    )
}

export default CategoryProducts