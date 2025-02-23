import React from 'react'
import "./CommonCategory.css"
import CommonCategoryBox from './CommonCategoryBox'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { use } from 'react'
import Productbox from '../Products/Productbox'
import { GetProductsByCategory } from '../../../Redux/Slice/productsSlicer'
const CommonCategory = ({ category, mainProductId }) => {
    const dispatch = useDispatch()
    const { categoryProducts, loading } = useSelector(state => state.product)
    useEffect(() => {
        if (category) {
            dispatch(GetProductsByCategory(category))
        }
    }, [dispatch, category])
    return (
        <div className="commonCategoryContainer">

            {Array.isArray(categoryProducts) && categoryProducts?.map((data, index) => {
                return (
                    <Productbox
                        products={data._id !== mainProductId ? data : null}
                        key={index}
                        from="Common"

                    />
                )
            })}
        </div>
    )
}

export default CommonCategory