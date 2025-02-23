import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useParams } from 'react-router'
import { useState, useEffect } from 'react'
import Filterbar from '../Filterbar/Filterbar'
import CategoryProducts from './CategoryProducts'

const ProductCategory = () => {
    const { category } = useParams()
    return (
        <div className="productsComponent">
            <Filterbar />
            <CategoryProducts
                category={category}
            />
        </div>
    )
}

export default ProductCategory