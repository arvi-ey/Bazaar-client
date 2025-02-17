import React, { useEffect, useState } from 'react'
import Productbox from './Productbox'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { GetProductsByCategory } from '../../../Redux/Slice/productsSlicer'
const ProductsComponent = ({ categoryName }) => {
    const dispatch = useDispatch()
    const { products } = useSelector(state => state.product)

    useEffect(() => {

        if (categoryName) {
            dispatch(GetProductsByCategory(categoryName))
        }
    }, [dispatch, categoryName])

    return (
        <div className="productComponent">
            {
                Array.isArray(products) && products?.map((data, index) => (
                    <Productbox
                        products={data}
                        key={index}
                    />
                ))
            }
        </div>
    )
}

export default ProductsComponent